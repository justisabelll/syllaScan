import os
import docx
import tempfile
from semanticSearch import semanticSearch as Search 
from fastapi import FastAPI, File, UploadFile, HTTPException
from starlette.middleware.cors import CORSMiddleware
from PyPDF2 import PdfFileReader
from db_upload import uploadtoDB, Syllabus


    
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

def getDocxText(file):
    alltext = ""
    with tempfile.NamedTemporaryFile(delete=True) as tmp:
        tmp.write(file.read())
        tmp.flush()
        document = docx.Document(tmp.name)
        for para in document.paragraphs:
            alltext += para.text
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

