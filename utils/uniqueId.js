// https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/22649233#questions/13330268
const uniqueID = () => Date.now().toString(36) + Math.random().toString(36).slice(2);
const uniqueIDVer2 = () => +`${Date.now()}`.slice(-10);

export { uniqueID as _v1, uniqueIDVer2 as _v2 };
