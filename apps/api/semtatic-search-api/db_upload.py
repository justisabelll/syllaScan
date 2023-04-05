import os
from supabase import create_client, Client
from pydantic import BaseModel

class Syllabus(BaseModel):
    name: str
    ownerID: str
    corpus: str
    biasScore: float
    findings: list
    

SUPABASE_URL="https://shodhbtrjfucaphdwqbt.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNob2RoYnRyamZ1Y2FwaGR3cWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ0MzY3ODYsImV4cCI6MTk5MDAxMjc4Nn0.APKukDDJgSAocOFX1ABydK4jzSwbCFD01LCp3qCqGJo"

url: str = (SUPABASE_URL)
key: str = (SUPABASE_ANON_KEY)


supabase = create_client(url, key)

def uploadtoDB(syllToBeUploaded : Syllabus):
    uploading = supabase.table("Syllabi").insert({
        "owningUserID": syllToBeUploaded.ownerID,
        "corpus": syllToBeUploaded.corpus,
        "biasScore": syllToBeUploaded.biasScore,
        "name": syllToBeUploaded.name,
        "findings": syllToBeUploaded.findings
    }).execute()
    