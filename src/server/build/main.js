!function(e){function t(t){for(var r,o,i=t[0],c=t[1],d=t[2],u=0,m=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&m.push(n[o][0]),n[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(s&&s(t);m.length;)m.shift()();return l.push.apply(l,d||[]),a()}function a(){for(var e,t=0;t<l.length;t++){for(var a=l[t],r=!0,i=1;i<a.length;i++){var c=a[i];0!==n[c]&&(r=!1)}r&&(l.splice(t--,1),e=o(o.s=a[0]))}return e}var r={},n={0:0},l=[];function o(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=r,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(a,r,function(t){return e[t]}.bind(null,r));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/bundle";var i=window.webpackJsonp=window.webpackJsonp||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var d=0;d<i.length;d++)t(i[d]);var s=c;l.push([405,1]),a()}({346:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=a(106);t.COUNTRIES=r.gql`
  query Country($name: String) {
    country(name: $name) {
      name
      regions {
        name
      }
    }
  }
`,t.GET_GLOBAL_STATS=r.gql`
  query GlobalStats {
    globalStatsWithChange {
      confirmed {
        number
        perc
        change
      }
      recovered {
        number
        perc
        change
      }
      deaths {
        number
        perc
        change
      }
      active {
        number
        perc
        change
      }
    }
    countryDataList {
      countryRegion
      confirmed
      recovered
      active
      deaths
      updated
    }
  }
`,t.LOAD_TIME_SERIES=r.gql`
  query TimeSeries($name: String) {
    confirmed: timeSeries(type: "confirmed", countryRegion: $name) {
      provinceState
      countryRegion
      data {
        date
        nums
      }
    }
    deaths: timeSeries(type: "deaths", countryRegion: $name) {
      provinceState
      countryRegion
      data {
        date
        nums
      }
    }
  }
`,t.GET_COUNTRY_DATA=r.gql`
  query GlobalStats($name: String) {
    globalStatsWithChange(countryRegion: $name) {
      confirmed {
        number
        perc
        change
      }
      recovered {
        number
        perc
        change
      }
      deaths {
        number
        perc
        change
      }
      active {
        number
        perc
        change
      }
    }
    confirmed: timeSeries(type: "confirmed", countryRegion: $name) {
      provinceState
      countryRegion
      data {
        date
        nums
      }
    }
    deaths: timeSeries(type: "deaths", countryRegion: $name) {
      provinceState
      countryRegion
      data {
        date
        nums
      }
    }
  }
`},405:function(e,t,a){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(a(0)),l=r(a(18)),o=r(a(410));l.default.hydrate(n.default.createElement(o.default,null),document.getElementById("root"))},410:function(e,t,a){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(135),l=r(a(0)),o=a(347),i=r(a(415)),c=a(574),d=a(106),s=r(a(575));t.default=()=>l.default.createElement(d.ApolloProvider,{client:s.default},l.default.createElement(n.ThemeProvider,{theme:c.theme},l.default.createElement(o.BrowserRouter,null,l.default.createElement(i.default,null))))},415:function(e,t,a){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(a(0)),l=a(52),o=a(347),i=r(a(416)),c=r(a(417)),d=r(a(572)),s=r(a(573)),u=l.makeStyles(e=>l.createStyles({title:{flexGrow:1},root:{flexGrow:1},toolbar:{padding:"0px 48px"},grow:{flexGrow:1},icon:{textDecoration:"none",color:e.palette.primary.contrastText},toolBarOffset:{minHeight:"64px"},typographyLink:{textDecoration:"none",color:e.palette.primary.contrastText}}));t.default=()=>{const e=u();return d.default(),n.default.createElement(n.default.Fragment,null,n.default.createElement(l.CssBaseline,null),n.default.createElement("div",{className:e.root},n.default.createElement(l.AppBar,{position:"fixed"},n.default.createElement(l.Toolbar,{className:e.toolbar,variant:"dense"},n.default.createElement(l.Typography,{variant:"h5",component:o.Link,to:"/",className:e.typographyLink},"Covid-19 Tracker"),n.default.createElement("div",{className:e.grow}),n.default.createElement("div",null,n.default.createElement("a",{href:"https://www.github.com/SiddharthMantri/covid-graphql",target:"_blank",className:e.icon},n.default.createElement(i.default,null))))),n.default.createElement("div",{style:{minHeight:"64px"}}),n.default.createElement(o.Switch,null,c.default.map(e=>n.default.createElement(o.Route,Object.assign({key:e.name},e))))),n.default.createElement(s.default,null))}},417:function(e,t,a){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(a(418)),l=r(a(570)),o=[{path:"/",name:"home",exact:!0,component:n.default},{path:"/:country",name:"country",exact:!1,component:l.default}];t.default=o},418:function(e,t,a){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=a(106),o=a(52),i=a(135),c=r(a(0)),d=n(a(431)),s=n(a(434)),u=n(a(567)),m=a(346),f=i.makeStyles(e=>({root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},content:{flexGrow:1,padding:e.spacing(3)},toolbar:e.mixins.toolbar})),p=[{Header:"Country",accessor:"countryRegion",align:"left"},{Header:"Confirmed",accessor:"confirmed",align:"right"},{Header:"Deaths",accessor:"deaths",align:"right"},{Header:"Recovered",accessor:"recovered",align:"right"}];t.default=()=>{const e=f(),[t,a]=c.useState({}),[r,n]=c.useState([]),[i,g]=c.useState(""),[h,y]=c.useState({}),{loading:b,error:E,data:v}=l.useQuery(m.GET_GLOBAL_STATS),[_,{loading:S,data:x}]=l.useLazyQuery(m.LOAD_TIME_SERIES),C=c.useCallback(e=>{g(e),_({variables:{name:e}})},[]);return c.useEffect(()=>{v&&(a(Object.assign({},v.globalStatsWithChange)),n([...v.countryDataList]))},[v]),c.useEffect(()=>{x&&y(Object.assign({},x))},[x]),c.default.createElement("div",{className:e.root},c.default.createElement("main",{className:e.content},c.default.createElement(o.Container,{maxWidth:"xl"},c.default.createElement(o.Grid,{container:!0,spacing:2},c.default.createElement(o.Grid,{item:!0,xs:12,sm:12,md:3,lg:3},c.default.createElement(u.default,{type:"confirmed",data:t.confirmed})),c.default.createElement(o.Grid,{item:!0,xs:12,sm:12,md:3,lg:3},c.default.createElement(u.default,{type:"deaths",data:t.deaths})),c.default.createElement(o.Grid,{item:!0,xs:12,sm:12,md:3,lg:3},c.default.createElement(u.default,{type:"recovered",data:t.recovered})),c.default.createElement(o.Grid,{item:!0,xs:12,sm:12,md:3,lg:3},c.default.createElement(u.default,{type:"active",data:t.active})),c.default.createElement(o.Grid,{item:!0,xs:12,sm:12,md:4,lg:4},c.default.createElement(o.NoSsr,null,c.default.createElement(d.default,{onClickCountry:C,data:r,columns:p}))),c.default.createElement(o.Grid,{item:!0,xs:12,sm:12,md:8,lg:8},c.default.createElement(o.NoSsr,null,c.default.createElement(s.default,{timeSeries:h,country:i})))))))}},431:function(e,t,a){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const n=a(52),l=r(a(0)),o=a(432),i=n.makeStyles(e=>({root:{minWidth:"100%",maxHeight:"480px",minHeight:"480px",padding:"0px 0px 8px 0px"},cardContent:{padding:"0px"},table:{minWidth:"100%"},padded:{padding:"16px 16px 8px 16px"},tableRow:{"&:hover":{cursor:"pointer"}}})),c=({columns:e,data:t,onClickCountry:a})=>{const{tableRow:r}=i(),c=l.useMemo(()=>[{id:"confirmed",desc:!0}],[]),{getTableProps:d,getTableBodyProps:s,headerGroups:u,rows:m,prepareRow:f}=o.useTable({columns:e,data:t,initialState:{sortBy:c}},o.useSortBy);return l.default.createElement(n.TableContainer,{style:{maxHeight:416}},l.default.createElement(n.Table,Object.assign({stickyHeader:!0},d(),{size:"small"}),l.default.createElement(n.TableHead,null,u.map(e=>l.default.createElement(n.TableRow,Object.assign({},e.getHeaderGroupProps()),e.headers.map(e=>l.default.createElement(n.TableCell,Object.assign({},e.getHeaderProps(e.getSortByToggleProps()),{align:e.align}),l.default.createElement(n.TableSortLabel,{active:e.isSorted,direction:e.isSortedDesc?"desc":"asc"},e.render("Header"))))))),l.default.createElement(n.TableBody,Object.assign({},s()),m.map(e=>(f(e),l.default.createElement(n.TableRow,Object.assign({},e.getRowProps(),{onClick:()=>{a(e.original.countryRegion)},className:r}),e.cells.map(e=>l.default.createElement(n.TableCell,Object.assign({},e.getCellProps(),{align:e.column.align}),isNaN(e.value)?e.render("Cell"):new Intl.NumberFormat("en-US").format(e.value)))))))))};t.default=({columns:e,data:t,onClickCountry:a})=>{const r=i();return l.default.createElement(n.Card,{className:r.root},l.default.createElement("div",null,l.default.createElement(n.CardContent,{className:r.cardContent},l.default.createElement(n.Typography,{variant:"h6",id:"tableTitle",className:r.padded},"Countries"),l.default.createElement(c,{columns:e,data:t,onClickCountry:a}))))}},434:function(e,t,a){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});const n=a(52),l=a(435),o=r(a(0)),i=a(565);class c extends o.default.Component{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,t){}render(){return this.state.hasError?o.default.createElement(n.Typography,{variant:"h6"},"Error in rendering chart. Reload page and try again"):this.props.children}}const d=n.makeStyles({root:{minWidth:"100%",minHeight:"480px",height:"480px"}});t.default=({country:e,timeSeries:t,separate:a=!1})=>{const r=d(),[s,u,m]=i.useDataChart({country:e,timeSeries:t,separate:a});let f={};f="log"===u?{type:"log",base:10,max:"auto"}:{type:"linear",max:"auto",min:"auto"};const p=n.useMediaQuery("(prefers-color-scheme: dark)"),g=o.useMemo(()=>p?"nivo":"dark2",[p]);return o.default.createElement(n.Card,{className:r.root},o.default.createElement(n.CardContent,{className:r.root},o.default.createElement(n.Grid,{container:!0,spacing:0},o.default.createElement(n.Grid,{item:!0,container:!0,xs:12},o.default.createElement(n.Grid,{item:!0,xs:12,md:6,lg:6},o.default.createElement(n.Typography,{variant:"h6"},e&&e.length>0?"Time series - Deaths - "+e:"")),o.default.createElement(n.Grid,{item:!0,container:!0,xs:12,md:6,lg:6},e&&e.length>0&&o.default.createElement(n.Typography,{component:"div"},o.default.createElement(n.Grid,{component:"label",container:!0,alignItems:"center",spacing:1},o.default.createElement(n.Grid,{item:!0},"Linear Scale"),o.default.createElement(n.Grid,{item:!0},o.default.createElement(n.Switch,{checked:"log"===u,onChange:()=>{m(e=>"log"===e?"linear":"log")},name:"checkedC"})),o.default.createElement(n.Grid,{item:!0},"Log Scale"))))),o.default.createElement(n.Grid,{item:!0,xs:12},o.default.createElement("div",{style:{height:420}},o.default.createElement(c,null,o.default.createElement(l.ResponsiveLine,{theme:i.theme,animate:!0,data:s,margin:{top:20,right:60,bottom:20,left:40},xScale:{type:"time",format:"%Y-%m-%d",precision:"day"},xFormat:"time:%Y-%m-%d",yScale:f,colors:{scheme:g},axisLeft:{legend:"Datum"},axisBottom:{format:"%b %d",tickValues:"every 5 day",legend:"Dates"},enablePointLabel:!0,pointSize:8,enableSlices:!1,useMesh:!0,legends:i.legends})))))))}},565:function(e,t,a){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(0),l=r(a(566));t.theme={background:"transparent",axis:{domain:{line:{}},ticks:{line:{},text:{}},legend:{text:{}}},grid:{line:{color:"black"}},legends:{text:{color:"white"}},labels:{text:{color:"white"}},markers:{lineColor:"black"},dots:{text:{color:"black"}},tooltip:{container:{color:"black"}}},t.legends=[{anchor:"top",direction:"row",justify:!1,translateX:300,translateY:-20,itemsSpacing:20,itemDirection:"left-to-right",itemWidth:120,itemHeight:20,itemOpacity:.75,symbolSize:12,symbolShape:"circle",symbolBorderColor:"rgba(0, 0, 0, .5)",effects:[{on:"hover",style:{itemBackground:"rgba(0, 0, 0, .03)",itemOpacity:1}}]}];const o=(e,t,a)=>e.map(e=>({id:`${t}/${e.countryRegion}${null!==e.provinceState?"/"+e.provinceState:""}`,color:a,data:e.data.filter(e=>0!==e.nums).map(e=>({x:l.default(e.date).format("YYYY-MM-DD"),y:e.nums}))}));t.useDataChart=({country:e,timeSeries:t,separate:a=!1})=>{const[r,l]=n.useState("deaths"),[i,c]=n.useState("linear");return[n.useMemo(()=>{if(t&&t.confirmed){o(t.confirmed,"Confirmed","hsl(218, 100%, 50%)");return[...o(t.deaths,"Deaths","hsl(2, 100%, 50%)")]}return[]},[t]),i,c]}},567:function(e,t,a){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(52),l=r(a(0)),o=a(210),i=r(a(568)),c=r(a(569)),d=n.makeStyles({root:{minWidth:"100%"}}),s={confirmed:{color:o.blue[700]},deaths:{color:o.red[700]},recovered:{color:o.green[700]},active:{color:o.yellow[700]}},u={recovered:"Recovered",confirmed:"Confirmed",deaths:"Deaths",active:"Active"};t.default=({type:e,data:t})=>{const a=d(),r=t?new Intl.NumberFormat("en-US").format(t.number):0,o=t?t.perc.toFixed(3):0,m=t?new Intl.NumberFormat("en-US").format(t.change):0;return l.default.createElement(n.Card,{className:a.root},l.default.createElement(n.CardContent,null,l.default.createElement(n.Typography,{variant:"body1"},u[e]),l.default.createElement(n.Grid,{container:!0,spacing:0},l.default.createElement(n.Grid,{item:!0,xs:12,sm:12,md:6,lg:6,style:{display:"flex",alignItems:"center"}},l.default.createElement(n.Typography,{variant:"h4",style:Object.assign({},s[e])},t?""+r:"")),l.default.createElement(n.Grid,{item:!0,xs:12,sm:12,md:3,lg:3,style:{display:"flex",alignItems:"center"}},t&&t.perc>0?l.default.createElement(c.default,{style:Object.assign(Object.assign({},s[e]),{fontSize:"0.875rem"})}):l.default.createElement(i.default,{style:Object.assign(Object.assign({},s[e]),{fontSize:"0.875rem"})}),l.default.createElement(n.Typography,{variant:"body2",style:Object.assign({},s[e])},t?o+"%":"")),l.default.createElement(n.Grid,{item:!0,xs:12,sm:12,md:3,lg:3,style:{display:"flex",alignItems:"center"}},t&&t.number>0?l.default.createElement(c.default,{style:Object.assign(Object.assign({},s[e]),{fontSize:"0.875rem"})}):l.default.createElement(i.default,{style:Object.assign(Object.assign({},s[e]),{fontSize:"0.875rem"})}),l.default.createElement(n.Typography,{variant:"body2",style:Object.assign({},s[e])},t?""+m:"")))))}},570:function(e,t,a){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=a(106),l=a(52),o=r(a(0)),i=r(a(571)),c=a(346),d=l.makeStyles(e=>({root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1},content:{flexGrow:1,padding:e.spacing(3)},card:{minWidth:"100%"},toolbar:e.mixins.toolbar,typography:{textAlign:"center"},list:{paddingLeft:"0px",paddingRight:"0px"}}));t.default=({match:e})=>{const t=d(),{params:{country:a}}=e,{loading:r,data:s,error:u}=n.useQuery(c.GET_COUNTRY_DATA,{variables:{name:a}});return o.default.createElement("div",{className:t.root},o.default.createElement("main",{className:t.content},o.default.createElement(l.Container,{maxWidth:"xl"},o.default.createElement(l.Grid,{container:!0,spacing:2},o.default.createElement(l.Grid,{item:!0,container:!0,xs:12,sm:12,md:3,lg:3,spacing:2},o.default.createElement(l.Grid,{item:!0,xs:12,sm:12},o.default.createElement(l.Card,{className:t.card},o.default.createElement(l.CardContent,null,o.default.createElement(l.Typography,{variant:"h5"},a," - at a glance"),o.default.createElement(l.List,{className:t.list},s?o.default.createElement(o.default.Fragment,null,o.default.createElement(i.default,{type:"confirmed",data:s.globalStatsWithChange.confirmed}),o.default.createElement(i.default,{type:"deaths",data:s.globalStatsWithChange.deaths}),o.default.createElement(i.default,{type:"active",data:s.globalStatsWithChange.active})):null)))),o.default.createElement(l.Grid,{item:!0,xs:12,sm:12},o.default.createElement(l.Card,{className:t.card},o.default.createElement(l.CardContent,null,o.default.createElement(l.Typography,{variant:"h5"},"Time since update -"),o.default.createElement(l.List,{className:t.list})))))))))}},571:function(e,t,a){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(a(0)),l=a(52),o={recovered:"Recovered",confirmed:"Confirmed",deaths:"Deaths",active:"Active"};t.default=({type:e,data:t})=>{let a=t?new Intl.NumberFormat("en-US").format(t.number):"";return n.default.createElement(l.ListItem,{disableGutters:!0},n.default.createElement(l.ListItemText,null,n.default.createElement(l.Typography,{variant:"body1"},o[e])),n.default.createElement(l.ListItemSecondaryAction,null,n.default.createElement(l.ListItemText,null,n.default.createElement(l.Typography,{variant:"body1"},a))))}},572:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=a(0);t.default=()=>{r.useEffect(()=>{const e=document.querySelector("#jss-server-side");e&&e.parentElement.removeChild(e)},[])}},573:function(e,t,a){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=r(a(0)),l=a(52),o=l.makeStyles(e=>({padded:{padding:"32px !important"}}));t.default=()=>{const e=o();return n.default.createElement(n.default.Fragment,null,n.default.createElement(l.Divider,null),n.default.createElement(l.Container,{maxWidth:"lg",className:e.padded},n.default.createElement(l.Grid,{container:!0,spacing:2},n.default.createElement(l.Typography,{variant:"body1"},"Sources: "),"    ",n.default.createElement(l.Typography,{variant:"body1",component:l.Link,href:"https://github.com/CSSEGISandData/COVID-19",target:"_blank"},"Novel Coronavirus (COVID-19) Cases, provided by JHU CSSE"))))}},574:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=a(52);t.theme=r.createMuiTheme({palette:{type:"light"}})},575:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});const r=a(106),n=e.env.API_URL,l=new r.HttpLink({uri:n}),o=new r.ApolloClient({link:l,cache:(new r.InMemoryCache).restore(window.__APOLLO_STATE__),ssrMode:!0});t.default=o}).call(this,a(99))}});