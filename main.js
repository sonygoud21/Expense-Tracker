var editing = null

function saveToLocalStorage(event){
    event.preventDefault();
    const amount=event.target.name.value;
    const category=event.target.category.value;
    const date=new Date().getDay();

    const obj={
        category,
        amount,
        date
    }
      if (editing === null) {
        axios.post("https://crudcrud.com/api/f3b7901754874ecc9dc7c922c076d90a/appointmentData",obj)
        .then((response)=>{
            showUserOnScreen(response.data);
        })
        .catch(err=>{
            document.body.innerHTML=err;
            console.log(err)

        })
    } else {
        const ur='https://crudcrud.com/api/f3b7901754874ecc9dc7c922c076d90a/appointmentData'+'/'+editing;
        axios.put(ur,obj)
        .then((response)=>{
            showUserOnScreen(response.data);
            // console.log(response.data);
        })
        .catch(err=>{
            document.body.innerHTML=err;
            console.log(err)

        })
        editing = null;
        
    }
}

window.addEventListener("DOMContentLoaded",()=>{

    axios.get("https://crudcrud.com/api/f3b7901754874ecc9dc7c922c076d90a/appointmentData")
        .then((res)=>{

            console.log(res)

            for(var i=0; i<res.data.length;i++){
                showUserOnScreen(res.data[i])
            }
        })
        .catch(err=>console.log(err))

function showUserOnScreen(obj){
    const parentElemen=document.getElementById('listofitems');
    const children=document.createElement('li');

    children.textContent=obj.price+'- '+obj.description+'- '+obj.category;

    const deletebtn=document.createElement('input');
    deletebtn.type='button'
    deletebtn.value='Deleteexpense'


    deletebtn.onclick=()=>{
        
        const tim=obj.time;
        axios.delete(`https://crudcrud.com/api/f3b7901754874ecc9dc7c922c076d90a/appointmentData/${obj._id}`)
            .then(res=>(console.log('done')))
            .catch(err=>console.log(err));
        localStorage.removeItem(obj.description);
        parentElemen.removeChild(children)
    }

    children.appendChild(deletebtn)
    const editbtn=document.createElement('input')
    editbtn.type='button'
    editbtn.value='Editexpense'
    editbtn.onclick=()=>{
        localStorage.removeItem(obj.description)
        parentElemen.removeChild(children)
        document.getElementById('amount').value=obj.amount
        document.getElementById('date').value=obj.description
        document.getElementById('category').value=obj.category
        editing = obj._id;
        
    }
    children.appendChild(deletebtn)
    children.appendChild(editbtn)
    parentElemen.appendChild(children)
}
})
