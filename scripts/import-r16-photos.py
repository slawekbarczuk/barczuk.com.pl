#!/usr/bin/env python3
from urllib.request import build_opener, HTTPCookieProcessor, Request
from urllib.parse import quote
from http.cookiejar import CookieJar
from pathlib import Path
import json, re, html
data = {"fabryczna":"https://barczuk.sharepoint.com/:u:/g/IQDEfyU7_tjNSZDOtlDFqITiAVferlxUAmrYLA18_j8dnRI","manufaktura":"https://barczuk.sharepoint.com/:u:/g/IQAZe3_1YoM6SZZFFrOsO4iLATu_xniKQ6kTIwS5jVQU23k","piotrkowska":"https://barczuk.sharepoint.com/:u:/g/IQACEHqNrRcjS5OG5WC9qnTTAZtbnqWoYm6xS8gMZfiw4Ko","ec1":"https://barczuk.sharepoint.com/:u:/g/IQBXYxDfgKH1Qqa3SAn6XDpgAZk8O78X8vXLftw_VZ7bfys"}
folder=Path("assets/photos-r16")
folder.mkdir(parents=True,exist_ok=True)
for name,share in data.items():
    cookies=CookieJar()
    opener=build_opener(HTTPCookieProcessor(cookies))
    original="https://barczuk.sharepoint.com/Shared%20Documents/Barczuk%20WWW%20-%20grafiki%20R16/"+name+".webp"
    rel="/Shared Documents/Barczuk WWW - grafiki R16/"+name+".webp"
    download="https://barczuk.sharepoint.com/_layouts/15/download.aspx?SourceUrl="+quote(rel,safe="")
    attempts=[
        share+"?download=1&v=xl-20261118", share,
        original+"?download=1",
        download,
    ]
    success=False
    for url in attempts:
        try:
            req=Request(url,headers={"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/133.0 Safari/537.36","Accept":"*/*"})
            with opener.open(req,timeout=40) as response:
                data_bytes=response.read(3_000_000)
                final=response.url
                content_type=response.headers.get("Content-Type","")
            print("URL attempt",name,url.split("?")[0],"got",len(data_bytes),"bytes",content_type,"final",final[:120],flush=True)
            width=height=0
            if data_bytes[:4]==b"RIFF" and data_bytes[8:12]==b"WEBP" and data_bytes[12:16]==b"VP8 " and len(data_bytes)>=30:
                width=int.from_bytes(data_bytes[26:28],"little") & 0x3fff
                height=int.from_bytes(data_bytes[28:30],"little") & 0x3fff
            if data_bytes[:4]==b"RIFF" and data_bytes[8:12]==b"WEBP" and len(data_bytes)>50000 and width>=1400 and height>=800:
                (folder/(name+".webp")).write_bytes(data_bytes)
                print("OK HD",name,len(data_bytes),"resolution",width,"x",height,flush=True)
                success=True
                break
            if b"<html" in data_bytes[:600].lower() or b"<!doctype" in data_bytes[:600].lower():
                # Log only public-page structure to diagnose anonymous sharing compatibility.
                source=data_bytes.decode("utf-8","ignore")
                print("html hints", name,
                    "login=" + str("login.microsoftonline.com" in source),
                    "downloadUrl=" + str("downloadUrl" in source),
                    "direct=" + str("download.aspx" in source),
                    "page=" + str(re.search(r"<title[^>]*>(.{0,80})</title>",source,re.I|re.S).group(1) if re.search(r"<title[^>]*>(.{0,80})</title>",source,re.I|re.S) else ""),
                    flush=True)
        except Exception as e:
            print("Download error",name,type(e).__name__,str(e)[:130],flush=True)
    if not success:
        raise RuntimeError("No valid high-resolution WebP (>=1400x800, >=50KB) available from anonymous share for "+name)
