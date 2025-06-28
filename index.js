
function storeLocally()
{

  let obj =[impTaskLists,ImpCompletedTask,ImpActiveBtn];
  MiscObj=[MiscTaskList,MiscCompletedTask,MiscActiveBtn];
  obj = JSON.stringify(obj)
  MiscObj = JSON.stringify(MiscObj);

  localStorage.setItem('todo',(obj));
  localStorage.setItem('todo-misc',MiscObj)

}
function LoadData()
{
  let obj = localStorage.getItem('todo')
  if(!obj)
    {
      impTaskLists=[]
      impTaskLists.push(document.querySelector('.imp-buttons-list').innerHTML);
      ImpActiveBtn=1;
      ImpCompletedTask=0;
    }
  else
  {
     obj = JSON.parse(obj)
    impTaskLists = obj[0];
    ImpCompletedTask=obj[1];
    ImpActiveBtn=obj[2];
  }
  
  let MiscObj = localStorage.getItem('todo-misc')
  if(!MiscObj)
    {
      MiscTaskList=[]
      MiscTaskList.push(document.querySelector('.misc-task-list').innerHTML);
      MiscActiveBtn=1;
      MiscCompletedTask=0;
    }
  else
  {
    MiscObj = JSON.parse(MiscObj)
    MiscTaskList = MiscObj[0];
    MiscCompletedTask=MiscObj[1];
    MiscActiveBtn=MiscObj[2];
  }
}


function askTask(task_type)
{
    let askUser=`<div class="css-user-ip">
      <input type="text" placeholder="Task name" class="js-task-name css-task-ip">
      <button class="js-task-ok css-task-ok">Let's go!</button>
      <div class="css-input-error"></div>
    </div>`

    let overlay_div=document.querySelector('.js-overlay') 
    overlay_div.classList.add('css-overlay')             
    overlay_div.innerHTML=askUser
    task_input = document.body.querySelector('.js-task-name')
    task_input.focus()
    task_input.addEventListener('keydown',(event)=>
      {
        if(event.key=='Enter')
          {
            task_added(task_input.value,task_type);
            task_input.value='';
          }
      })

    document.querySelector('.js-task-ok').addEventListener('click',()=>
      {
        task_added(task_input.value,task_type)        
        task_input.value='';
      })
}


function addTask(task_type)
{ 
  let task_input;
  if(task_type==='imp')
    {
      if(ImpActiveBtn<4)
        {
          let askUser=`<div class="css-user-ip">
                    <input type="text" placeholder="Task name" class="js-task-name css-task-ip">
                    <button class="js-task-ok css-task-ok">Let's go!</button>
                    <div class="css-input-error"></div>
                  </div>`

          let overlay_div=document.querySelector('.js-overlay') 
          overlay_div.classList.add('css-overlay')             
          overlay_div.innerHTML=askUser
          task_input = document.body.querySelector('.js-task-name')
          task_input.focus()
          task_input.addEventListener('keydown',(event)=>
            {
              if(event.key=='Enter')
                {
                  task_added(task_input.value,task_type);
                  task_input.value='';
                }
            })

          document.querySelector('.js-task-ok').addEventListener('click',()=>
            {
              task_added(task_input.value,task_type)        
              task_input.value='';
            })
              
        }
    }
  else if(task_type==='misc')
    {
      let reset_task_btn = `<button id='reset_tasks' class='css-add-task-btn' onclick="clear_tasks(0,'misc')">Clear tasks</button>`     

      if(MiscActiveBtn==1)
        {
          askTask('misc')
          MiscTaskList.push(reset_task_btn)
         // show_tasks('misc')
        }
      else
      {
        askTask(task_type)
        //show_tasks('misc')
      }
    }
}
function clear_user_prompt()
{
  let close_window = document.querySelector('.css-user-ip')
  close_window.innerHTML='';
  close_window.classList.remove('css-overlay')
  let overlay_div=document.querySelector('.js-overlay') 
  overlay_div.innerHTML=''
  overlay_div.classList.remove('css-overlay')
}
function task_added(word,task_type)
  {
        
        if(word.length==0)
          {
            let show_error = document.querySelector('.css-input-error')
            show_error.innerHTML="Task name cannot be empty."
          }
        else
        {
          if(task_type==="imp")
            {
              let newBTN = `<button class='css-task-btn' id="btn${ImpActiveBtn}" onclick="task_complete(${ImpActiveBtn},'imp')">${word}</button>`
              impTaskLists.push(newBTN)
              ImpActiveBtn++;
              clear_user_prompt()
              show_tasks("imp") 
            }
          else if(task_type==="misc")
            {
              let newBTN = `<button class='css-task-btn' id="Miscbtn${MiscActiveBtn}" onclick="task_complete(${MiscActiveBtn},'misc')">${word}</button>`;   
     
              MiscTaskList.push(newBTN)
              MiscActiveBtn++;
              clear_user_prompt()
              show_tasks('misc')
            }
        }
      
  }

function show_tasks(task_type)
{
let newBTN=''
 
  if(task_type==="imp")
    {
      for(let i=1;i<impTaskLists.length;i++){newBTN+=impTaskLists[i]}

    if(ImpActiveBtn<4)
      {
        document.querySelector('.imp-buttons-list').innerHTML=newBTN+impTaskLists[0]
      }
    else if(ImpActiveBtn==4)
      {
        document.querySelector('.imp-buttons-list').innerHTML=newBTN;
      }
    }
  else
  {  
      newBTN='';
     // console.log('before displaying',MiscTaskList)
      let dupe=''
      for(let i=1;i<MiscTaskList.length;i++)
        {
          newBTN+=MiscTaskList[i]
        }
      let misc_task_div = document.getElementById('misc_task_new')
      let words= document.querySelector('.misc-task-list').innerHTML

      document.querySelector('.misc-task-list').innerHTML=newBTN+MiscTaskList[0]

  }

     storeLocally()
     update_progress_bar(ImpCompletedTask)
}
function task_complete(bt,task_type)
{
  if(task_type === 'imp')
    {
      let button = document.getElementById(`btn${bt}`)
      let  test= button.classList.contains('css-task-completed')

      if(test===false)
      {
        button.classList.add('css-task-completed')
        button=button.outerHTML
        impTaskLists[bt]=button;
        ImpCompletedTask++;
        update_progress_bar(ImpCompletedTask)
      }
      if(ImpCompletedTask==3)
      {
        setTimeout(()=>{ 
        clear_tasks(1,'imp');
        clear_tasks(2,'imp');
        clear_tasks(3,'imp');
        update_progress_bar(0);
        show_tasks("imp");
      },1000);

        ImpCompletedTask=0;
      }
      else
      {
        show_tasks("imp");
      }
       storeLocally();
    }
  else if(task_type == 'misc')
    {
      console.log('before adding',MiscTaskList)

      let button = document.getElementById(`Miscbtn${bt}`)
  
      let index = MiscTaskList.indexOf(button.outerHTML)
      console.log(button.getHTML,MiscTaskList[bt])
      console.log('button',button.outerHTML,`\n`,'highlighted','index',index);

      let  test= button.classList.contains('css-task-completed')

      if(test===false)
        {
        button.classList.add('css-task-completed')
        button=button.outerHTML
        MiscTaskList[index]=button
        MiscCompletedTask++;
        //show_tasks('misc')
         //storeLocally();
        }
      else if(test===true)
        {
          button.classList.remove('css-task-completed')
          console.log(`current button`,button,index)
          button=button.outerHTML;
          MiscTaskList[index]=button;
          MiscCompletedTask--;
          console.log(`after removal button`,button,index)
         // show_tasks('misc')
        }
        show_tasks('misc')
    }

   
}

function update_progress_bar(p_val)
{
  let progress = document.getElementById('progressbar')
  let ptr = document.getElementById('ptrprogress')
  let percentage_val = document.querySelector('.js-percentage')
  if(p_val===0)
    {
      progress.style.background=`conic-gradient(#fff ${1*3.6*100}deg, #fff 0deg)`
      percentage_val.innerHTML=`0%`
    }
  else
  {
  let degree=(3.6*p_val*100)/(ImpActiveBtn-1)
  let ptr_degree = degree+2;
  progress.style.background=`conic-gradient(cornflowerblue ${degree}deg, #fff 0deg)`;
  ptr.style.background=`conic-gradient(from ${ptr_degree}deg,transparent 99%,#ff0000 1%)`
  percentage_val.innerHTML=`${Math.round(degree*100/360)}%`
  }
}

function show_about()
{
  let question=`<div class="css-about-page">
                  <div class='about-title-span'>About</div>
                  <div class='about-proj-div'>PaceYourSelf is a todo-list application that is different from a conventional todo-list. It encourages the user to break down their work into manageable parts. At a time, users can only add upto three tasks and they can only add more tasks after completing the previous ones. After completing all three tasks, users can add new tasks that they want to accomplish. By doing this, it encourages them to focus on the task at hand and helps them to feel less overwhelmed. The progress bar lets the user know how much work they have accomplished so far. 
                  <p></p>
                  If you have any doubts about how to operate the app, click the help button, which will provide detailed instructions on how to use the app.
</div>
                  <button class="css-banner-close" onclick=close_banner()>Close</button>
              </div>
              `
  let banner = document.querySelector('.js-overlay')
  banner.classList.add('css-overlay')
   banner.innerHTML=question;
}
function show_help()
{
  let question=`<div class="css-about-page">
                  <div class='about-title-span'>Help</div>
                  <div class='about-proj-div'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                  <button class="css-banner-close" onclick=close_banner()>Close</button>
                  <button class="css-reset-everything css-banner-close" onclick="reset_everything()">Reset everything</button>
              </div>
              `
  let banner = document.querySelector('.js-overlay')
  banner.classList.add('css-overlay')
   banner.innerHTML=question;
}
function reset_everything()
    {  
        localStorage.removeItem('todo')
        localStorage.removeItem('todo-misc')
        location.reload()
    }
function close_banner()
{
  let banner = document.querySelector('.js-overlay')
  banner.classList.remove('css-overlay')
  banner.innerHTML='';
}
function clear_tasks(index,task_type)
{

  if(task_type==='imp')
    {
        index = impTaskLists.indexOf(`<button class='css-task-btn' onclick="task_complete(${index})">Task ${index}</button>`)
        impTaskLists.splice(index,1)
        ImpActiveBtn--;
        show_tasks('imp');
    }

  else if(task_type === 'misc')
    {    
      console.log(MiscTaskList)
      let buttons = document.querySelectorAll('.css-task-completed')
     // console.log(buttons)
      buttons.forEach(bt => {
      //  console.log(bt)
        if(bt.id.includes('Misc'))
          {
            let index = bt.id
            let bt_text = bt.innerHTML;
            //console.log(bt_text)
            let bt_outer = `<button class="css-task-btn css-task-completed" id="${index}" onclick="task_complete(${index.replace('Miscbtn','')},'misc')">${bt_text}</button>`
            //console.log(bt_outer)
            index = MiscTaskList.indexOf(bt_outer)
            console.log('index of button to be deleted',index)
            MiscTaskList = MiscTaskList.toSpliced(index,1)
           // MiscActiveBtn--;
          }
      });
      show_tasks('misc')
     console.log(MiscTaskList)
    }
}
 LoadData();
show_tasks('imp')
show_tasks('misc')
update_progress_bar(0);
