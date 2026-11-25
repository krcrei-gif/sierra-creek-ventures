"""Make a 1200x630 link-preview card for a blog post: photo + title.

Usage: python3 make-share-card.py PHOTO "Post title" OUT.jpg [--plain]
--plain keeps the photo without the title overlay (for images that already carry text).
Every blog post gets its own card in img/share/, referenced by its og:image tag.
"""
import sys
from PIL import Image, ImageDraw, ImageFont
FONT='/usr/share/fonts/truetype/google-fonts/Lora-Variable.ttf'
def card(photo, title, out, plain=False):
    W,H=1200,630
    im=Image.open(photo).convert('RGB')
    s=max(W/im.width,H/im.height); im=im.resize((round(im.width*s),round(im.height*s)),Image.LANCZOS)
    top=int((im.height-H)*0.4); left=(im.width-W)//2; im=im.crop((left,top,left+W,top+H)).convert('RGBA')
    if not plain:
        f=ImageFont.truetype(FONT,56); small=ImageFont.truetype(FONT,26)
        d=ImageDraw.Draw(im); words=title.split(); lines=[]; cur=''
        for w in words:
            t=(cur+' '+w).strip()
            if d.textlength(t,font=f)<=1060: cur=t
            else: lines.append(cur); cur=w
        lines.append(cur)
        block=len(lines)*68+56
        ov=Image.new('RGBA',(W,H),(0,0,0,0)); od=ImageDraw.Draw(ov); start=H-block-170
        for y in range(max(start,0),H):
            a=int(225*min(1,((y-start)/(H-start))**1.15)); od.line([(0,y),(W,y)],fill=(16,30,42,a))
        im=Image.alpha_composite(im,ov); d=ImageDraw.Draw(im)
        y=H-block-18
        for ln in lines: d.text((70,y),ln,font=f,fill=(255,255,255,255)); y+=68
        d.text((72,y+8),'Sierra Creek Ventures',font=small,fill=(212,219,225,255))
    im.convert('RGB').save(out,quality=86,optimize=True,progressive=True)
if __name__=='__main__':
    a=[x for x in sys.argv[1:] if x!='--plain']; card(a[0],a[1],a[2],'--plain' in sys.argv)
