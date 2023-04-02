import os
from semanticSearch import semanticSearch as Search 
from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfFileReader

class Syllabus(BaseModel):
    name: str
    ownerID: str
    corpus: str
    biasScore: float
    findings: list
    
    
def checkExtension(file):
    return os.path.splitext(file)[1]
                        
def getPDFText(file):
    alltext = ""
    reader = PdfFileReader(file)
    numOfPages = len(reader.pages)
    for i in range(numOfPages):
        page = reader.getPage(i)
        alltext += page.extractText()
    return alltext
        
    

app = FastAPI()

def prints(text):
    print(type(text))


origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3000/Upload",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
   return {"Working": "True"}


@app.post("/upload")
async def process_syllabus(syllabus_file: UploadFile = File(...), owner_ID: str = ""):
    extension = checkExtension(syllabus_file.filename)
    
    if extension == ".pdf":
        syllabusText = getPDFText(syllabus_file.file)
    else:
        syllabusText = await syllabus_file.read()
        syllabusText = syllabusText.decode('utf-8')
    
    Findings = Search(syllabusText)
    Syllabus_ForDB = Syllabus(name = syllabus_file.filename, ownerID = owner_ID, corpus = Findings.corpus, biasScore = Findings.docScore, findings = Findings.findings)
        
    return Syllabus_ForDB

