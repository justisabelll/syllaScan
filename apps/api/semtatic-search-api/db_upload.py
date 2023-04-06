import os
from supabase import create_client, Client
from pydantic import BaseModel

class Syllabus(BaseModel):
    name: str
    ownerID: str
    corpus: str
    biasScore: float
    findings: list
    
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_ANON_KEY")

supabase = create_client(url, key)

def uploadtoDB(syllToBeUploaded : Syllabus):
    uploading = supabase.table("Syllabi").insert({
        "owningUserID": syllToBeUploaded.ownerID,
        "corpus": syllToBeUploaded.corpus,
        "biasScore": syllToBeUploaded.biasScore,
        "name": syllToBeUploaded.name,
        "findings": syllToBeUploaded.findings
    }).execute()
    