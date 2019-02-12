*** Settings ***
Documentation     在左边搜索框，用床号搜索患者
Test Setup        添加图片地址
Library           Remote    http://192.168.100.229:8270/    #Test Teardown    停止远程服务器

*** Variables ***
${IMAGE_DIR}      E:\\rftest\\bris\\patient_search\\search_by_number\\

*** Test Cases ***
登陆软件
    打开康复信息软件
    清除旧有的账号
    输入新账号
    确认登陆

搜索患者
    选择床号
    输入床号
    点击搜索

*** Keywords ***
添加图片地址
    Add Image Path    ${IMAGE_DIR}

停止远程服务器
    Stop Remote Server

打开康复信息软件
    doubleClick    desktop_cloud_brain.png
    wait until screen contain    login_page.png    10

清除旧有的账号
    doubleClick    login_page_account.png
    Press Special Key    BACKSPACE
    doubleClick    login_page_password.png
    Press Special Key    BACKSPACE

输入新账号
    Input Text    login_page_account.png    123456
    Input Text    login_page_password.png    123456

确认登陆
    Click    login_page_login_button

输入床号
    wait until screen contain    main_page_search_text.png    10
    Click    main_page_search_text.png
    Input Text    main_page_search_text.png    321

选择床号
    wait until screen contain    main_page.png    10
    Click    main_page_search_box.png
    wait until screen contain    main_page_search_number.png    3
    Click    main_page_search_number.png
    Click    main_page_temp.png

点击搜索
    Click    main_page_search_button.png