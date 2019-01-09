*** Settings ***
Documentation     Sikuli Library Demo
Test Setup        Add Needed Image Path
Test Teardown     Stop Remote Server
Library           Remote    http://192.168.100.237:8270/

*** Variables ***
${IMAGE_DIR}      E:\\rftest\\bris\\login_register\\register\\

*** Test Cases ***
Register Bris
    Open Bris Page
    Go To Register Page
    Type Information
    Confirm Register


*** Keywords ***
Add Needed Image Path
    Add Image Path    ${IMAGE_DIR}

Open Bris Page
    doubleClick    desktop_cloud_brain.png
    wait until screen contain    login_page.png    10
    mouse move    login_page_register_button.png
Go To Register Page
    doubleClick    login_page_register_button
    wait until screen contain     register_page    10
Type Information
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
Confirm Register
    Click          register_page_ok
    wait until screen contain      register_page_confirm_register.png   10
    Click          register_page_confirm_register_button.png