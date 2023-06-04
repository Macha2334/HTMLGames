let el=document.getElementById("board")
            let num;
            for(let i=1;i<=10;i++){
                let row=document.createElement('div');             
                row.setAttribute("id",'row'+(i));
                for(j=1;j<=10;j++){
                    num=10*(i-1)+j;
                    let col=document.createElement('span');             
                    col.setAttribute("id",'item'+(j));
                    let textN=document.createTextNode(num);
                    col.appendChild(textN)
                    row.appendChild(col);
                }
                el.appendChild(row)
            }