*** Settings ***
Documentation     注册康复信息软件
Test Setup        添加图片地址
Test Teardown     停止远程服务器
Library           Remote    http://192.168.100.237:8270/

*** Variables ***
${IMAGE_DIR}      E:\\rftest\\bris\\login_register\\register\\

*** Test Cases ***
用户注册
    打开康复信息软件
    进入注册页面
    输入相关注册信息
    确认注册


*** Keywords ***
添加图片地址
    Add Image Path    ${IMAGE_DIR}

停止远程服务器
    Stop Remote Server
打开康复信息软件
    doubleClick    desktop_cloud_brain.png
    wait until screen contain    login_page.png    10
    mouse move    login_page_register_button.png
进入注册页面
    doubleClick    login_page_register_button
    wait until screen contain     register_page    10
输入相关注册信息
    Paste Text     register_page_name.png     张志
    Click          register_page_sex.png
    Input Text     register_page_age.png      30
    Input Text     register_page_tel.png      13894639274
    Click          register_page_member.png
    Paste Text     register_page_number.png    123456
    Paste Text     register_page_password.png  123456
    Paste Text     register_page_confirm_password.png  123456
    Paste Text     register_page_hospital.png   大竹县人民医院
    Paste Text     register_page_section.png    康复科
    Paste Text     register_page_email.png         test@163.com
确认注册
    Click          register_page_ok
    wait until screen contain      register_page_confirm_register.png   10
    Click          register_page_confirm_register_button.png