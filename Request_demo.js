const axios = require('axios')
const fs = require('fs')

axios.get("http://saral.navgurukul.org/api/courses").then((resp) => {
    const str = JSON.stringify(resp.data,null,4)
// console.log(str);


    const promise = new Promise ((resolve,reject)=>{
        setTimeout(()=>{

        fs.writeFile("demodata.json", str,(err) => {
            resolve ("data wrote.....")})

        } , 2000)
    })


    const prom1 = new Promise ((resolve,reject)=>{
        setTimeout(()=>{
            fs.readFile("demodata.json",(err, str) => {
                resolve(JSON.parse(str))
            })

        },4000)

    })
    async function show(){
        let num1 = await promise
        // console.log(num1)

        let num2 = await prom1
        // console.log(num2)
        let availableCourses = (num2["availableCourses"])
        console.log(availableCourses)
        let empty = []
        let empty2=[]
        let index=0
        for(i in availableCourses){
            console.log((index),availableCourses[i]['name'] , availableCourses [i]['id'])
            empty.push(availableCourses[i]['id'])
            empty2.push(availableCourses[i]['name'])
            index++
        }
        console.log(empty)
        // console.log(empty2)

        let readlineSync = require('readline-sync')
        let user_index = parseInt(readlineSync.question("Enter a Id:--"))

        //console.log(empty[user_index])
        axios.get("https://saral.navgurukul.org/api/courses/"+empty[user_index]+"/exercises").then((resp1) => {
        
        

            const string = JSON.stringify(resp1.data,null,4)
            const prom2 = new Promise ((resolve,reject)=>{
                setTimeout(()=>{
        
                    fs.writeFile("course"+user_index+".json", string,(err) => {
                        resolve ("writing data.....")
                    })
            
                    } , 2000)
                })
        
            const prom3 = new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    fs.readFile("course"+user_index+".json",(err, string) => {
                        resolve(JSON.parse(string))
                    })
        
                    },4000)
    
            })
            async function showout (){
                let number1 = await prom2
                // console.log (number1)

                let number2 = await prom3
                // console.log(number2)

                let rev=(number2['data'])
                console.log(empty2[user_index])
                // console.log(rev)
                

                let s=0
                let empty_slug=[]
                for(i in rev){
                    var demo=(rev[i]["childExercises"])
                    if (demo.length>0){
                        for (i in demo){
                            console.log( s, demo[i]['name'])
                            empty_slug.push(demo[i]['slug'])
                            s++
                    }
                }
                    else{
                        console.log("Not Available")
                    }
                
                
                    
                
            }
                let k=0
                for(i in empty_slug){
                    console.log(k,empty_slug[i])
                    k++
            }

                
                let readlineSync = require('readline-sync')
                let slug_user = (readlineSync.question("Enter a slug:--"))
                var b=empty_slug[slug_user]
                console.log(b)
                // console.log(empty_slug)

                

            

            
        
    


                axios.get("http://saral.navgurukul.org/api/courses/"+empty[user_index]+"/exercise/getBySlug?slug="+b).then((resp2)=> {
                    const start = JSON.stringify(resp2.data,null,4)
                    const prom4 = new Promise ((resolve,reject)=>{
                        setTimeout(()=>{
                
                            fs.writeFile("id_slug"+slug_user+".json", start,(err) => {
                                resolve ("writing data.....")
      1
                          })
                    
                            } , 2000)
                        })
                
                    const prom5 = new Promise((resolve,reject)=>{
                        setTimeout(()=>{
                            fs.readFile("id_slug"+slug_user+".json",(err, start) => {
                                resolve(JSON.parse(start))
                            })
                
                            },4000)
            
                    })
                    async function myfun (){
                        let n1 = await prom4
                        // console.log (n1)
        
                        let n2 = await prom5
                        console.log(n2["content"])

                        

                    }
                        

                        

                    myfun()
        
                        
                       
                    
            
            

               

              

            
                
                

            


             

                    
                    

                    })
                
        
                   

            
            }showout()
        })
    }show()
   
})

