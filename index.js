/*  Week 12 Coding Project
    Author: Bob Ruzga
    FE 2024 April Cohort
    July 18, 2024

    Coding project:
        - Create a full CRUD application of your choice using an API or JSON Server.
        - Use JQuery/AJAX to interact with the API. 
        - Use a form to post new entities.
        - Build a way for users to update or delete entities.
        - Include a way to get entities from the API.
        - Use Bootstrap and CSS to style your project.

Recommended API:
    - MockAPI - This is one of the most popular APIs with our mentors! 
        - Get more tips on CRUD with MockAPI!
    - You are free to use an API of your choosing; however, it must support all CRUD operations.
    - Refer to the Week 12 Lab for how to use db.json/json-server
*/

    const projDataSvrUrl = "http://localhost:3000/bobsProj12Data";
    
    // Fill the table with all the Teachers in the json database
    $.get(projDataSvrUrl).then(data => {
        data.map(teacher => {
          $('tbody').append(
            $(`
              <tr>
                <td>${teacher.id}</td>
                <td>${teacher.fullName}</td>
                <td>${teacher.subject}</td>
                <td><button id="deleteRow" class="btn btn-outline-danger" onclick="deleteUser(${teacher.id})">🗑</button</td>
              </tr>
              `)
          )
        })
     });

     // Add button to add New Teachers with their subjects they will be teaching
     $('#newTeacherBtn').click(function () {
        let inTeacherName = $('#aTeacherName').val();
        let inSubject = $('#aSubject').val();
       
        if (inSubject == "" || inTeacherName == "") {
            alert("Please enter a Teacher's Name and Subject");
        } else {
                /* let newData = JSON.stringify({ 
                    "fullName": inTeacherName,
                    "subject": inSubject
                     })  Fixed this problem by downgrading json server to 0.17.4 from current*/
        
                 $.post(projDataSvrUrl, { 
                    "fullName": inTeacherName,
                    "subject": inSubject
                     })  //NB: Hit the unexpected token error similar to Week 11 Lab. Used Stringify to resolve here too!
                 }
        })

      // Deleting a Teacher
      function deleteUser(id) {
        $.ajax(`${projDataSvrUrl}/${id}`, {
          type: 'DELETE'
        })
        
      }

      // Updating Teacher Information
      function updateUser(){
        let id = $('#uTeacherId').val();
        let upTeacherName = $('#uTeacherName').val();
        let upSubject = $('#uSubject').val();
         
        /*  let newData = JSON.stringify({ 
            "fullName": upTeacherName,
            "subject": upSubject,
          })  Changed the version of json server to 0.17.4 from current beta and this was no longer needed*/
        
        $.ajax(`${projDataSvrUrl}/${id}`, {
          method: 'PUT',
          data: { 
            "fullName": upTeacherName,
            "subject": upSubject,
             }
        })
      }
      
      // Event Listener for Updating Teacher Button
      $('#updTeacherBtn').click(updateUser);
      

// End of JS Code
      