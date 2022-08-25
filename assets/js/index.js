$("#add_user").submit(function (event) {
  alert("Data Saved Sucessfully");
});
$("#update_user").submit(function (event) {
  console.log("clicked");
  event.preventDefault();
  var unindexed_array = $(this).serializeArray();
  var data = {};
  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });
  var request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    alert("Data Updated Successfully!");
  });
});
if (window.location.pathname == "/") {
  $onTabel = $(".table tbody tr button.update");
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");

    var request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done(function (response) {
        alert("Data Deleted Successfully!");
        location.reload();
      });
    }
  });
  // var unindexed_array = $(this).serializeArray()
  // console.log(unindexed_array)
  // var checkbox = document.querySelectorAll('input[type=checkbox]')[0]
  // var id = document.querySelectorAll('input[type=checkbox]')[0].id
  // console.log(document.querySelectorAll('input[type=checkbox]'))
  // var tuser = document.getElementById("users").innerHTML
  // console.log(checkbox)
  // console.log(tuser)
  var arr = [];
  var arrdel = [];
  $("input:checkbox").change(function () {
    var $this = $(this);
    if ($this.is(":checked")) {
      if (!arr.includes(this.id)) {
        arr.push(this.id);
        arrdel.push(this.value);
      }
    }
  });
  // checkbox.addEventListener('change', function() {
  //     if (this.checked) {
  //         // var empty = document.getElementById("First")
  //         // console.log(empty)
  //         // var name = document.getElementById("First").innerHTML
  //         // var change = ''
  //         // console.log("Checkbox is checked..",document.getElementById("First").innerHTML );
  //         // document.getElementById("First").innerHTML  = `<input type="text" name="name-<%= users[i].id %>" value=${name} placeholder="Mark Stoenis"/>`
  //         let first = document.getElementById("name").innerHTML
  //         var email = document.getElementById("email-1").innerHTML
  //         let mf = document.getElementById("gender-1").innerHTML
  //         // var male = document.getElementById("male-1").innerHTML
  //         // var female = document.getElementById("female-1").innerHTML
  //         let ai = document.getElementById("status-1").innerHTML
  //         // var active = document.getElementById("active-1").innerHTML
  //         // var inactive = document.getElementById("inactive-1").innerHTML

  //         document.getElementById("name").innerHTML = `<input  type="text" name="name" value="${first}" placeholder="Mark Stoenis" >`
  //         document.getElementById("email-1").innerHTML = `<input  type="text" name="email" value="${email}" placeholder="example@gmail.com">`
  //         if(mf == 'Male'){
  //             document.getElementById("gender-1").innerHTML= `
  //             <select name='gender'>
  //                 <option value="Male" selected="selected">Male</option>
  //                 <option value="Female">Female</option>
  //             </select>
  //             `
  //         }else{
  //             document.getElementById("gender-1").innerHTML =
  //             `
  //             <select name='gender'>
  //                 <option value="Male">Male</option>
  //                 <option value="Female" selected="selected">Female</option>
  //             </select>
  //              `
  //         }
  //         if(ai=='Active'){
  //        document.getElementById("status-1").innerHTML =
  //        `
  //             <select name='status'>
  //                 <option value="Active" selected="selected">Active</option>
  //                 <option value="Inactive">Inactive</option>
  //             </select>
  //              `
  //         }else{
  //              document.getElementById("status-1").innerHTML =
  //        `
  //             <select name='status'>
  //                 <option value="Active">Active</option>
  //                 <option value="Inactive" selected="selected">Inactive</option>
  //             </select>
  //             `
  //         }

  //         // document.getElementById("First").addEventListener('input',function(event){
  //         //     change+=event.data
  //         //     console.log(change)
  //         // })
  //     }
  //     // else {
  //     //     document.getElementById("First").innerHTML= empty
  //     //     console.log("Checkbox is not checked..");
  //     // }
  //     });
  // console.log(document.getElementById("check 1"))

  //     function validate() {
  //     if (document.getElementById("check 1").checked) {
  //         alert("checked");
  //         console.log('Checked')
  //     } else {
  //         alert("You didn't check it! Let me check it for you.");
  //     }
  // }

  // var save = document.getElementById("save");
}
var edit = document.getElementById("edit");
edit.addEventListener("click", function (event) {
  event.preventDefault();
  arr.forEach((ele) => {
    // console.log(ele)
    let first = document.getElementById(`name-${ele}`).innerHTML;
    var email = document.getElementById(`email-${ele}`).innerHTML;
    let mf = document.getElementById(`gender-${ele}`).innerHTML;
    var ai = document.getElementById(`status-${ele}`).innerHTML;
    // var ai1 = $(`#status-${ele}`).html()
    document.getElementById(
      `name-${ele}`
    ).innerHTML = `<input  type="text" name="name" value="${first}" placeholder="Mark Stoenis" >`;
    document.getElementById(
      `email-${ele}`
    ).innerHTML = `<input  type="text" name="email" value="${email}" placeholder="example@gmail.com">`;

     ai.startsWith("A")
      ? (document.getElementById(`status-${ele}`).innerHTML = `
            <select name='status'>
                <option value="Active" selected="selected">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
              `)
      : (document.getElementById(`status-${ele}`).innerHTML = `
            <select name='status'>
                <option value="Active">Active</option>
                <option value="Inactive" selected="selected">Inactive</option>
            </select>
            `);

  if (mf == "Male") {
      document.getElementById(`gender-${ele}`).innerHTML = ` 
                <select name='gender'>
                    <option value="Male" selected="selected">Male</option>
                    <option value="Female">Female</option>
                </select>
                `;
    } else {
      document.getElementById(`gender-${ele}`).innerHTML = `
                <select name='gender'>
                    <option value="Male">Male</option>
                    <option value="Female" selected="selected">Female</option>
                </select>
                 `;
    }
  });
  arr = [];
});
$("#index").submit(function (event) {
  // console.log(document.querySelectorAll('.ckb'))
  // var allTr = document.querySelectorAll(".ckb");
  // // var chkbx = allTr[1].getElementsByTagName('td')[0]
  // // console.log(chkbx)
  event.preventDefault();
  var data = {};
  var unindexed_array = $(this).serializeArray();
  console.log(unindexed_array);
  for (var r = 0; r < unindexed_array.length; r++) {
    if (unindexed_array[r].name) {
      data[unindexed_array[r].name] = unindexed_array[r].value;
    }
    if (unindexed_array[r].name == "status") {
      var request = {
        url: `http://localhost:3000/api/users/${data.id}`,
        method: "PUT",
        data: data,
      };

      $.ajax(request).done(function (response) {});
    }
  }
  swal({
    title: "Good job!",
    text: "Data Updated",
    icon: "success",
    button: true,
    function(isConfirm) {
      debugger;
      setTimeout(function () {
        if (isConfirm) {
          swal("yes, do it!");
        } else {
          swal("cannel!");
        }
      }, 400);
    },
  }).then(function () {
    location.reload();
  });

  //     console.log(unindexed_array)
  //     console.log(unindexed_array)
  //     var values = [];
  //     for(var i=0; i< unindexed_array.length; i++)
  //     values.push([unindexed_array[i].value]);
  // values.flat(1)
  // console.log(values.flat(1))
  // const mid = Math.floor(values.flat(1).length / 2);
  // const result = [[0, mid], [mid, values.flat(1).length]].map(idxs => values.flat(1).slice(...idxs))
  //         var bulk = {
  //         "url" : `http://localhost:3000/api/users/bulk/all`,
  //         "method" : "PUT",
  //         "data" : result
  //     }
  //         $.ajax(bulk).done(function(response){
  //         alert("Data Updated Successfully!");
  //     })

  // console.log(result)
  //     // console.log(values.flat(1))
  //     $.map(unindexed_array, function(n, i){
  //        data[n['name']] = n['value'] ;
  //     //    console.log(data.name)
  //        if(data.name){
  //         console.log(data.name)
  //        }
  //     //    console.log(unindexed_array[i])
  //     })
  // console.log(data)
});
$("input:text").change(function (event) {
  console.log("Entered TExt");
  $("#sea").prop(
    "href",
    `http://localhost:3000/Search?first=${$("input:text").val()}%`
  );
});
$("#search").click(function (event) {
  event.preventDefault();
  console.log("clivked");
  console.log($("input:text").val());
  var request = {
    url: `http://localhost:3000/Search?first=${$("input:text").val()}%`,
    method: "GET",
  };

  $.ajax(request).done(function (response) {});
});
$("#delete").click(function (event) {
  console.log("clicked")
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      {
        arrdel.forEach((ele) => {
          let request = {
            url: `http://localhost:3000/api/users/${ele}`,
            method: "DELETE",
          };
          $.ajax(request).done(function (response) {});
        });
      }
      swal("Rows has been deleted!", {
        icon: "success",
      }).then(function () {
        location.reload();
      });
    } else {
      swal("Everything is safe!")
    }
  });
});
