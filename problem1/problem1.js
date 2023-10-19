const fs = require('fs');
const fileName1= "file1.json";
const fileName2= "file2.json";
const fileName3= "file3.json";

fs.writeFile(fileName1,"juj",(err,data)=>{
    if(err){
        console.log("error in Writing_fileName1")
    }
    else{
        console.log("file1 successfull");
        
        fs.writeFile(fileName2,"abcd",(err,data)=>{
            if(err){
                console.log("error in Writing_fileName2")
            }
            else{
                console.log("file 2 successfull");
                
                fs.writeFile(fileName3,"babcd",(err,data)=>{
                if(err){
                    console.log("error in Writing_fileName3")
                }
                else{
                    console.log("file 3 successfull");
                    
                    fs.unlink(fileName1,(err,data)=>{
                    if(err){
                        console.log("error in unlinked_fileName1")
                    }
                    else{
                        console.log("file1 deleted");
                        
                        fs.unlink(fileName2,(err,data)=>{
                        if(err){
                            console.log("error in unlinked_fileName2")
                        }
                        else{
                            console.log("file2 deleted");
                            
                            fs.unlink(fileName3,(err,data)=>{
                                if(err){
                                    console.log("error in unlinked_fileName3")
                                }
                                else{
                                   console.log("file3 deleted")
                                }
                                
                            }
                            );
                           
                        }
                        
                    }
                    );
                       
                    }
                    
                }
                );
    
                   
                }
                
            }
            );
               
            }
            
        }
        );
       
    }
    
}

    
);
