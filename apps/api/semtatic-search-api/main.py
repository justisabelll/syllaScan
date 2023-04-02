from semanticSearch import semanticSearch as Search 
from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class Syllabus(BaseModel):
    name: str
    ownerID: str
    corpus: str
    biasScore: float
    findings: list
    

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
async def process_syllabus(syllabus_file: UploadFile = File(...), owner_ID: str = None ):
    syllabusText = await syllabus_file.read()
    
    Findings = Search(syllabusText.decode('utf-8'))
    Syllabus_ForDB = Syllabus(name = syllabus_file.filename, ownerID = owner_ID, corpus = Findings.corpus, biasScore = Findings.docScore, findings = Findings.findings)
        
    return Syllabus_ForDB

