import os

from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()


if __name__ == "__main__":
    docs = []

    folder_path = "./cv_examples_and_guides"
    print("Ingesting...")
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)

        if filename.lower().endswith(".txt"):
            loader = TextLoader(file_path, encoding="utf-8")
        elif filename.lower().endswith(".pdf"):
            loader = PyPDFLoader(file_path)

        docs.extend(loader.load())

    print("Splitting...")
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

    split_docs = splitter.split_documents(docs)
    print(f"created {len(split_docs)} documents")

    embeddings = OpenAIEmbeddings()

    print("ingesting")
    PineconeVectorStore.from_documents(
        split_docs, embeddings, index_name=os.environ.get("INDEX_NAME")
    )
    print("finished")
