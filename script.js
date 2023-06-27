//const url = "https://api.npoint.io/38e5f46a83b9fd9af80b"
const url="https://api.npoint.io/39524daf2cef1ad01b4d"
class ItemGood{
    constructor(id, title, author,img){
        this.id = id,
        this.title = title,
        this.author = author,
        this.img = img
    }
    itemRender(){
        return `<div class="item"  id="${this.id}">
                    <img src="img/${this.img}">            
                    <h2>${this.title}</h2>
                    <h2>${this.author}</h2>
                </div>`
    }
}

class Goods{
    constructor(){
        this.goods = []
    }
    async fetchGoods(){
        const response = await fetch(url);
        const catalog = await response.json();
        this.goods = catalog;
    }

    render(){
        let listHTML = "";
        this.goods.forEach((item)=>{
            const itemGood = new ItemGood(item.id, item.title, item.author, item.img);
            listHTML += itemGood.itemRender();
        })

        document.querySelector(".list").innerHTML = listHTML;
    }
}

const init= async()=>{
const list = new Goods;
await list.fetchGoods();
list.render();

const basket =[];
document.querySelectorAll('.item').forEach(elem =>{

    elem.addEventListener('click', function(){
        let id_prod = this.id;
       let basket_item = list.goods.find(i =>i.id==id_prod)
       basket.push(basket_item);
       console.log(basket)

    })
})


let button = document.querySelector('.button')

button.addEventListener('click', ()=>{
    document.querySelector('.basket-list').innerHTML = basket.map(item =>
         `<div class="item"  id="${item.id}">
        <img src="img/${item.img}">            
        <h2>${item.title}</h2>
        <h2>${item.author}</h2>
    </div>`
    )
})

}



window.onload = init

