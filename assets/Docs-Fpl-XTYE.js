import{a as T,s as y,u as Q,b as x,c as E,d as q,r as D,j as e,B as _,e as C,T as c}from"./index-dzYyXlxS.js";const N="_docs_1ro7b_1",O="_docs__text_type_1ro7b_4",l={docs:N,docs__text_type:O},w=`{
  __schema {
    types {
      name
      description
    }
  }
}`,z=T.injectEndpoints({endpoints:a=>({getDocs:a.query({query({url:r,headers:s}){return{url:r,method:"POST",headers:{...s,"Content-Type":"application/json"},body:JSON.stringify({query:w})}},transformResponse:r=>r.data.__schema.types.filter(s=>!s.name.includes("__")),async onQueryStarted(r,{dispatch:s,queryFulfilled:t}){s(y(""));try{await t}catch(i){s(y(i.error.error))}}}),getType:a.query({query({url:r,type:s,headers:t}){const i=`{
          __type(name: "${s}") {
            name
            description
            fields {
              name
              description
              type {
                name
                description
              }
              args {
                name
                description
                type {
                  name
                  description
                }
              }
            }
          }
        }`,p=JSON.stringify({query:i});return{url:r,method:"POST",headers:{...t,"Content-Type":"application/json"},body:p}},async onQueryStarted(r,{dispatch:s,queryFulfilled:t}){s(y(""));try{await t}catch(i){s(y(i.error.error))}}})})}),{useLazyGetDocsQuery:B,useLazyGetTypeQuery:F,useGetDocsQuery:k}=z,v=a=>{let r;try{r=JSON.parse(a)}catch{r={}}return r},G=()=>{var u;const{t:a}=Q(),{url:r}=x(E),s=v(x(q)),[t,i]=D.useState([]),{data:p,isError:g}=k({url:r,headers:s}),[j,{isError:b}]=F(),m=async n=>{const d=await j({url:r,type:n,headers:s});if(d.data){const S=d.data.data.__type;i([...t,S])}},f=()=>{const n=t.slice(0,-1);i(n)},o=t[t.length-1],h=t[t.length-2];return e.jsxs(_,{className:l.docs,"data-testid":"docs",children:[!!t.length&&e.jsx(C,{variant:"outlined",color:"primary",size:"small",onClick:f,sx:{mb:"10px"},children:h?h.name:"Docs"}),e.jsx(c,{variant:"h4",mb:"30px",fontWeight:500,children:t.length?o==null?void 0:o.name:"Docs"}),g||b?e.jsx(c,{children:a("docs.error")}):t.length?e.jsxs(e.Fragment,{children:[e.jsx(c,{children:o==null?void 0:o.description}),!!((u=o==null?void 0:o.fields)!=null&&u.length)&&e.jsxs(e.Fragment,{children:[e.jsx(c,{mb:"15px",fontSize:18,fontWeight:500,children:"Fields"}),o.fields.map((n,d)=>e.jsxs(_,{mb:"20px",children:[e.jsxs(c,{color:"blue",children:[`${n.name}: `,e.jsx("span",{className:l.docs__text_type,onClick:()=>m(n.type.name),children:n.type.name})]}),e.jsx(c,{children:n.description})]},d))]})]}):e.jsxs(e.Fragment,{children:[e.jsx(c,{mb:"30px",children:a("docs.description")}),e.jsx(c,{mb:"15px",fontSize:18,fontWeight:500,children:a("docs.allSchema")}),p&&p.map((n,d)=>e.jsx(c,{className:l.docs__text_type,mb:"5px",onClick:()=>m(n.name),children:n.name},d))]})]})};export{G as default};
