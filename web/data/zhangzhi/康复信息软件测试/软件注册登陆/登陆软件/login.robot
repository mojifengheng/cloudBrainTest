*** Settings ***
Documentation     用现有账号登陆康复信息软件
Test Setup        添加图片地址
Test Teardown     停止远程服务器
Library           Remote    http://192.168.100.237:8270/

*** Variables ***
${IMAGE_DIR}      E:\\rftest\\bris\\login_register\\login\\

*** Test Cases ***
登陆软件
    打开康复信息软件
    清除旧有的账号
    输入新账号
    确认登陆


*** Keywords ***
添加图片地址
    Add Image Path    ${IMAGE_DIR}

停止远程服务器
    Stop Remote Server

打开康复信息软件
    doubleClick    desktop_cloud_brain.png
    wait until screen contain    login_page.png    10
清除旧有的账号
    doubleClick  login_page_account.png
    Press Special Key  BACKSPACE
    doubleClick   login_page_password.png
    Press Special Key  BACKSPACE
输入新账号
    Input Text    login_page_account.png    123456
    Input Text     login_page_password.png   123456
确认登陆
    Click         login_page_login_button
