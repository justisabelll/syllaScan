import os
import docx
import tempfile
from semanticSearch import semanticSearch as Search 
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware
from PyPDF2 import PdfReader
from db_upload import uploadtoDB, Syllabus
import supabase

    
def checkExtension(file):
    return os.path.splitext(file)[1]
                        
def getPDFText(file):
    alltext = ""
    reader = PdfReader(file)
    numOfPages = len(reader.pages)
    for i in range(numOfPages):
        page = reader.pages[i]
        alltext += page.extractText()
    return alltext

def getDocxText(file):
    alltext = ""
    with tempfile.NamedTemporaryFile(delete=True) as tmp:
        tmp.write(file.read())
        tmp.flush()
        document = docx.Document(tmp.name)
        for para in document.paragraphs:
            alltext += para.text
    return alltext

    

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://localhost",
    "https://localhost:3000",
]


middleware = [
    Middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"], allow_origin_regex="http://localhost(:\d+)?",
 )
]

app = FastAPI(middleware=middleware)



@app.get("/")
def read_root():
   return {"Working": "True"}


@app.post("/upload")
async def process_syllabus(syllabus_file: UploadFile = File(...), owner_ID: str = Form(...)):
    extension = checkExtension(syllabus_file.filename)
    
    if extension == ".pdf":
        syllabusText = getPDFText(syllabus_file.file)
    elif extension == ".docx":
        syllabusText = getDocxText(syllabus_file.file)
    elif extension == ".txt":
        syllabusText = await syllabus_file.read()
        syllabusText = syllabusText.decode('utf-8')
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type, Please upload a .pdf, .txt, or .docx")
        
    Findings = Search(syllabusText)
    Syllabus_ForDB = Syllabus(name = syllabus_file.filename, ownerID = owner_ID, corpus = Findings.corpus, biasScore = Findings.docScore, findings = Findings.findings)
    return uploadtoDB(Syllabus_ForDB)


@app.delete("/delete")
async def delete_syllabus(syllabus_ID: str ):
    try:
        deleted_syllabus = supabase.table("syllabi").delete().eq("id", syllabus_ID).execute()
        if deleted_syllabus:
            return {"status": "success", "message": "Syllabus deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Syllabus not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete syllabus: {str(e)}")