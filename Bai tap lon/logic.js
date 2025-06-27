console.log()   
class LogicUI{
    constructor(){
        this.data= thread.renderTable()
        this.init()
    }
    init(){
         this.renderPaginationBTN();
         this.renderHtml(0);
        
    }
    renderTbody(record){
        this.Tbody= document.getElementById("tbody");
        const tr= document.createElement("tr")
        tr.dataset.value=record.id;
        let tagCells="";
        for(let i in record.tags){tagCells+=`<td>${record.tags[i]}</td>`}
          console.log(tagCells)
        tr.innerHTML=`
            <td>${record.title}</td>
            ${tagCells}
            <td>${record.views}</td>
            <td><button class="EditBtn">Edit</button></td>
            <td><button class="DeleteBtn">Delete</button></td>    
        `;
        this.Tbody.appendChild(tr)
  
    }
///
    renderHtml(index){
        const currentpage= this.data[index];
        const table= document.getElementById("table");
        document.getElementById("tbody").innerHTML="";
        const noResults= document.getElementById("noResults");
        try{
            if( !currentpage.length|| !Array.isArray(currentpage)   ){
                noResults.style.display="block";
                table.style.display="none";
            }
            if(currentpage.length){
                noResults.style.display="none";
                table.style.display="block";
               
                currentpage.map(record=> this.renderTbody(record));
        
        
        //         document.querySelector("EditBtn").addEventListener("click",this.editFunction());
        // document.querySelector("DeleteBtn").addEventListener("click",this.deleteFunction());
                      
            }
        }catch(e){ console.log(`You are in renderHtml trouble: ${e.message}`)} 
        
    }
///
    renderPaginationBTN(){
        const paginate=document.getElementById("paginate")
        paginate.innerHTML="";
        for(let i=0;i<this.data.length;i++){
        const btn= document.createElement("button");
        btn.innerHTML=i+1;
        btn.addEventListener("click",()=>this.renderHtml(i));
        paginate.appendChild(btn)    
    }}    


    editFunction(){}
    deleteFunction(){}
}


const ui= new LogicUI();