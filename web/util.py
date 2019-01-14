from xml.dom.minidom import parse
import xml.dom.minidom
import os

def get_data_from_xml(file):
    testsuitInfo = {
        "testsuitName": None,
        "testcase":[],
        "testsuitStatus":None,
        "testsuitStartTime":None,
        "testsuitEndTime":None,
        "testsuitDoc":None
    }
    DOMTree = xml.dom.minidom.parse(file)
    collection = DOMTree.documentElement
    collectionChildNodes = collection.childNodes

    for collectionChildNode in collectionChildNodes:
        if collectionChildNode.nodeName == "suite":
            testsuit = collectionChildNode
            testsuitInfo["testsuitName"] = testsuit.getAttribute("name")
            testsuitChildNodes = testsuit.childNodes
            for testsuitChildNode in testsuitChildNodes:
                if testsuitChildNode.nodeName == "test":
                    testcaseInfo = {
                        "testcaseName":None,
                        "step":[],
                        "testcaseStatus":None
                    }
                    # add step for this testcase
                    testcase = testsuitChildNode
                    testcaseInfo["testcaseName"] = testcase.getAttribute("name")
                    testcaseChildNodes = testcase.childNodes
                    for testcaseChildNode in testcaseChildNodes:
                        if testcaseChildNode.nodeName == "kw":
                            keywordInfo = {
                                "keywordName":None,
                                "keywordStatus":False
                            }
                            keyword = testcaseChildNode
                            keywordInfo["keywordName"] = keyword.getAttribute("name")
                            keywordChildNodes = keyword.childNodes
                            for keywordChildNode in keywordChildNodes:
                                if keywordChildNode.nodeName == "status":
                                    keywordStatus = keywordChildNode
                                    keywordInfo["keywordStatus"] = keywordStatus.getAttribute("status")
                            testcaseInfo["step"].append(keywordInfo)
                        if testcaseChildNode.nodeName == "status":
                            testcaseStatus = testcaseChildNode
                            testcaseInfo["testcaseStatus"] = testcaseStatus.getAttribute("status")
                    testsuitInfo["testcase"].append(testcaseInfo)
                if testsuitChildNode.nodeName == "status":
                    testsuitStatus = testsuitChildNode
                    testsuitInfo["testsuitStartTime"] = testsuitStatus.getAttribute("starttime")
                    testsuitInfo["testsuitEndTime"] = testsuitStatus.getAttribute("endtime")
                    testsuitInfo["testsuitStatus"] = testsuitStatus.getAttribute("status")
                if testsuitChildNode.nodeName == "doc":
                    testsuitDoc = testsuitChildNode
                    testsuitInfo["testsuitDoc"] = testsuitDoc.childNodes[0].data

    return testsuitInfo


def findDataFromXML(findPath):
    # data = {"testFind":"okFindDataFromPath"}
    path = os.path.join("data", findPath["userName"], findPath["projectName"], findPath["testsuitName"], findPath["testcaseName"], "output.xml")
    # print(path)
    if os.path.exists(path):
        data = get_data_from_xml(path)
        # print(data)
    return data


if __name__ == "__main__":
    testsuitInfo = get_data_from_xml("../rfCore/bris/login_register/login/output.xml")
    print(testsuitInfo)