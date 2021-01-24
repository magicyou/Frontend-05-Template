// import { List } from "./List.js";
// import { Button } from "./Button.js";
import { createElement } from "./framework.js";
import Carousel from "./Carousel";

let d = [
  {
    img:
    'https://img4.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',
    url: "https://time.geekbang.com",
    title: "geek time",
  },
  {
    img:
    'https://img4.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',
    url: "https://tmall.com",
    title: "tmall",
  },
  {
    img:
    'https://img4.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',
    url: "https://taobao.com",
    title: "taobao",
  },
  {
    img:
    'https://img4.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',
    url: "https://baidu.com",
    title: "baidu",
  },
];

let a = (
  <Carousel
    src={d}
    onChange={(event) => console.log(event.detail.position)}
    onClick={(event) => (window.location.href = event.detail.data)}
  />
);
a.mountTo(document.body);

/*
 ** Button

let btn = <Button>btn</Button>;
btn.mountTo(document.body);
 */

/*
 ** List

let list = (
  <List data={d}>
    {(record) => (
      <div>
        <img src={record.img} />
        <a href={record.url}>{record.title}</a>
      </div>
    )}
  </List>
);
list.mountTo(document.body);
 */
