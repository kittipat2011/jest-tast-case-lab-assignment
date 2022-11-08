/*-------------------------------------------------------------
ITCS371 Introduction to Software Engineering Semester 1/2022
Testing Assignment
------------------------------Member---------------------------
Kittipat Arpanon 6388119
Sorawanan Jeamjantarasakhon 6388019
---------------------------------------------------------------*/

//Import all the require dependencies
const express = require("express"), 
app = express(), 
router = require("../routes/studentServiceRoutes"),
puppeteer = require("puppeteer"),
request = require("supertest");

// Unit test
//Test get student information by ID using /student/:id function
describe("Unit Test: get student by ID function testing", () =>{
    test("Test: Input STU_ID(1) to equal STU_ID(1),STU_FNAME(test),STU_LNAME(test),STU_AGE(10) ", async () => {
        //retrieve information from database
        const res = await request(app).get("/student/1");
        //expect the result to equal to STU_ID(1),STU_FNAME(test),STU_LNAME(test),STU_AGE(10)
        expect(res.body.data).toEqual({
            STU_ID: 1,
            STU_FNAME: "test",
            STU_LNAME: "test",
            STU_AGE: 10,
        },
    );
    });
});

//Test get all student information by using /students function
describe("Unit Test: get all student information function testing", () => {
    test("Test: List all the student via /students", async () => {
        //retrieve all student information from database
        const res = await request(app).get("/students");
        //expect the result to be every student in the database
        expect(res.body.data).toEqual([{
            STU_ID: 1,
            STU_FNAME: "test", 
            STU_LNAME: "test", 
            STU_AGE: 10, 
        },
        {
            STU_ID: 6388019,
            STU_FNAME: "Sorawanan", 
            STU_LNAME: "Jeamjantarasakhon", 
            STU_AGE: 21, 
        },
        {
            STU_ID: 6388119,
            STU_FNAME: "Kittipat", 
            STU_LNAME: "Arpanon", 
            STU_AGE: 20, 
        },
        {
            STU_ID: 630510214,
            STU_FNAME: "Siroj", 
            STU_LNAME: "Pongthipan", 
            STU_AGE: 20, 
        },
        {
            STU_ID: 1630706578,
            STU_FNAME: "Akarachai", 
            STU_LNAME: "Sukpraw", 
            STU_AGE: 20, 
        },
        {
            STU_ID: 1650202748,
            STU_FNAME: "Thanaphat", 
            STU_LNAME: "Sae-Be", 
            STU_AGE: 20, 
        },
    ]);
    });
});

// Integation test
// Test connection default routing function 
describe("Integation Test: Testing default route function", () => {
    app.use("/", router);
    test("Test: GET /", async () => { 
       // request connection to default routing using / function
       const res = await request(app).get("/");
       //expect the response to be error(true), message(hello) 
       expect(res.body).toEqual({ error: true, message: "hello" 
        });
    });
});
//Test getting information of the first student in database with /students and /student/:id
describe("Integation Test: Getting information of the first student in database with /students and /student/:id", () => { 
    // create variable to store information of the first student
    let firstStudent; 
    test("Test: GET all students via /students", async () => { 
        //retrieve all student information from database
        const res = await request(app).get("/students");
        //expect the result to be every student in the database
        expect(res.body.data).toEqual([ {
            STU_ID: 1,
            STU_FNAME: "test", 
            STU_LNAME: "test", 
            STU_AGE: 10, 
        },
        {
            STU_ID: 6388019,
            STU_FNAME: "Sorawanan", 
            STU_LNAME: "Jeamjantarasakhon", 
            STU_AGE: 21, 
        },
        {
            STU_ID: 6388119,
            STU_FNAME: "Kittipat", 
            STU_LNAME: "Arpanon", 
            STU_AGE: 20, 
        },
        {
            STU_ID: 630510214,
            STU_FNAME: "Siroj", 
            STU_LNAME: "Pongthipan", 
            STU_AGE: 20, 
        },
        {
            STU_ID: 1630706578,
            STU_FNAME: "Akarachai", 
            STU_LNAME: "Sukpraw", 
            STU_AGE: 20, 
        },
        {
            STU_ID: 1650202748,
            STU_FNAME: "Thanaphat", 
            STU_LNAME: "Sae-Be", 
            STU_AGE: 20, 
        },
        ]); 
        firstStudent = res.body.data[0];
     });
     //Test Get the information of the first student via /student/:id
     test("Test: Get the information of the first student via /student/:id", async () => { 
        //retrieve student information from database using the first student ID
        const res = await request(app).get(`/student/${firstStudent.STU_ID}`); 
        //Expect the information to be the same
        expect(res.body.data).toEqual(firstStudent); 
    }); 
});
//System test
describe("System Test: ",() => {
    test("Test: Getting the information of student through the user interface.", async () => { 
        // Create browser using puppeteer 
        const browser = await puppeteer.launch({ 
            headless: false, 
            slowMo: 80, 
            args: ["--window-size=1920,1080"], 
            executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", });
    
            const page = await browser.newPage(); 
            // Set the page to the web location 
            await page.goto("http://localhost:3100/"); 
            // Click and type value "2" into the textbox STU_ID"" 
            await page.click("input#STU_ID"); 
            await page.type("input#STU_ID", "1"); 
            page.on("dialog", async (dialog) => { 
                await dialog.accept(); }); 
                // Click on "Select" button to search for the student 
                await page.click("input#select");
             }, 20000);
});
