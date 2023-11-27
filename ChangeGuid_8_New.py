import os
import json
import chardet
import re
import time
import pandas as pd
def get_file_encoding(path):
    f = open(path, 'rb')
    data = f.read()
    file_encoding = chardet.detect(data).get('encoding')
    f.close()
    return file_encoding

oldGuidSet = []

def Get_OldGuidSet():
    FileList = os.listdir()
    path=""
    if "Levels" in FileList:
        path = os.path.join("Levels","NewLevel.level")
    InProject = False
    if not os.path.exists(path):
        for fileName in FileList:
            if fileName.endswith(".project"):
                InProject = True
                path = fileName
                break
    if not os.path.exists(path):
        return 
    encod = get_file_encoding(path)
    if os.path.exists(path):
        with open(path,"r",encoding=encod) as f:
            data = json.load(f)
            f.close()

        if InProject:
            SceneArr = data["Levels"][0]["Scene"]
        else:
            SceneArr = data["Scene"]
        for ActorNote in SceneArr:
            oldGuidSet.append(ActorNote["Guid"])

def GetMid(InStr:str)->str:
    if len(InStr) == 32:
        return InStr[0:8]
    elif len(InStr) == 64:
        return InStr[0:8] + InStr[32:40]
def ChangeTsGuid(GuidLen:int,dirName:str):
    if not os.path.exists(dirName):
        return 
    if dirName == 'JavaScripts':
        ReplaceTsGuid(GuidLen,dirName)
    elif dirName == 'Prefabs' or dirName == 'TempPrefabs':
        Prefabdirs = os.listdir(dirName)
        for Prefabdir in Prefabdirs:
            PrefabScriptPath = os.path.join(dirName,Prefabdir,"Script")
            if os.path.exists(PrefabScriptPath):
                ReplaceTsGuid(GuidLen,PrefabScriptPath)
    # 脚本
    # for root,dirs,files in os.walk(fileName):
        
def ReplaceTsGuid(GuidLen:int,Path:str):
    for root,dirs,files in os.walk(Path):
        for filename in files:
            if not filename.endswith(".ts"):
                continue
            file_data = ""
            FilePath = os.path.join(root,filename)
            encode = get_file_encoding(FilePath)
            with open(FilePath,"r",encoding=encode) as rf:
                for lineContent in rf:
                    reList = re.findall("[0-9A-Z]{%d}" % GuidLen,lineContent)
                    for Guid in reList:   
                        if Guid in oldGuidSet or GetMid(Guid) in oldGuidSet:
                            RealGuid = GetMid(Guid)
                            lineContent = lineContent.replace(Guid,RealGuid)
                            print("OldGuid:%s->NewGuid:%s Path:%s" % (Guid,RealGuid,FilePath))
                    file_data+=lineContent
            rf.close()
            if file_data != "":
                with open(FilePath,"w",encoding=encode) as wf:
                    wf.write(file_data)
                    wf.flush()
                wf.close()
# 处理配置表Guid
def ChangeExcelGuid():
    RootDirName = "Excel"
    if not os.path.exists(RootDirName):
        return 
    ExcelFileList = os.listdir(RootDirName)
    for ExcelFileName in ExcelFileList:
        if not ExcelFileName.endswith(".xlsx"):
            continue
        FilePath = os.path.join(RootDirName,ExcelFileName)
        Excel = pd.read_excel(FilePath,keep_default_na=False)
        ExcelVa = Excel.values
        row = len(ExcelVa)
        if row <= 0:
            continue
        col = len(ExcelVa[0])
        for i in range(0,row):
            for j in range(0,col):
                if ExcelVa[i][j] != "":
                    ExcelVa[i][j] = FindAndReplace(str(ExcelVa[i][j]),32,FilePath)
                    ExcelVa[i][j] = FindAndReplace(str(ExcelVa[i][j]),64,FilePath)
        Excel.to_excel(FilePath)
         
def FindAndReplace(content:str,GuidLen:int,FilePath:str):
    reList = re.findall("[0-9A-Z]{%d}" % GuidLen,content)
    for Guid in reList:   
        if Guid in oldGuidSet or GetMid(Guid) in oldGuidSet:
            RealGuid = GetMid(Guid)
            content = content.replace(Guid,RealGuid)
            print("OldGuid:%s->NewGuid:%s Path:%s" % (Guid,RealGuid,FilePath))
    return content

def main():
    Get_OldGuidSet()
    Path = ["JavaScripts","Prefabs","TempPrefabs"]
    for Item in Path:
        ChangeTsGuid(64,Item)
        ChangeTsGuid(32,Item)
    ChangeExcelGuid()
    print("Success!")
if __name__ == '__main__':
    main()
    time.sleep(100)