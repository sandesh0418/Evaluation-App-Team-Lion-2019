(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{30:function(e,t,a){},34:function(e,t,a){e.exports=a.p+"static/media/ulm.20e0e1bc.jpg"},37:function(e,t,a){e.exports=a(74)},42:function(e,t,a){},68:function(e,t,a){},74:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(31),o=a.n(l),i=(a(42),a(3)),s=a(4),c=a(6),m=a(5),u=a(7),d=(a(19),a(76)),p=a(77),h=a(32),b=a(2),v=a(11),g=a.n(v),E=a(16),f=a.n(E),y=function(e){g.a.defaults.headers.common.Authorization=e||null},w="SET_CURRENT_USER",N="GET_ERRORS";function C(e){return{type:w,payload:e}}var j=a(14),k=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).onChangeEmail=a.onChangeEmail.bind(Object(b.a)(a)),a.onChangePassword=a.onChangePassword.bind(Object(b.a)(a)),a.onSubmit=a.onSubmit.bind(Object(b.a)(a)),a.state={email:"",password:"",errors:{}},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"onChange",value:function(e){this.setState(Object(h.a)({},e.target.name,e.target.value))}},{key:"handleClick",value:function(e){e.preventDefault(),window.location.assign("/register")}},{key:"onSubmit",value:function(e){e.preventDefault(),this.props.login(this.state),this.setState({email:"",password:""})}},{key:"render",value:function(){var e=this.state.errors;return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("h1",null,"Sign In"),e.form&&r.a.createElement("div",{className:"alert alert-danger"},e.div),r.a.createElement("div",{className:"from-group"},r.a.createElement("label",null,"Email:"),r.a.createElement("input",{className:"form-control",type:"text",name:"email",placeholder:"Please enter your email",value:this.state.value,onChange:this.onChange,required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Password:"),r.a.createElement("input",{className:"form-control",type:"password",name:"password",placeholder:"Please enter your password",value:this.state.value,onChange:this.onChange,required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{className:"btn btn-primary",type:"submit",value:"Sign In"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{className:"btn btn-primary",id:"register",type:"button",value:"Register",onClick:this.handleClick})))}}]),t}(n.Component);k.contextTypes={router:r.a.PropTypes.object.isRequired};var O=Object(j.b)(null,{login:function(e){return function(t){return g.a.post("http://localhost:8000/api/login",e).then(function(e){var a=e.data.token,n=e.data.role;localStorage.setItem("Token",a),localStorage.setItem("Role",n),y(a),t(C(f()(a)))}).catch(function(e){return t({type:N,payload:e.res.data})})}}})(k),S=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).onChangeCwid=a.onChangeCwid.bind(Object(b.a)(a)),a.onChangeFirstName=a.onChangeFirstName.bind(Object(b.a)(a)),a.onChangeLastName=a.onChangeLastName.bind(Object(b.a)(a)),a.onChangeEmail=a.onChangeEmail.bind(Object(b.a)(a)),a.onChangePassword=a.onChangePassword.bind(Object(b.a)(a)),a.onChangeRole=a.onChangeRole.bind(Object(b.a)(a)),a.onSubmit=a.onSubmit.bind(Object(b.a)(a)),a.state={cwid:"",firstName:"",lastName:"",email:"",password:"",role:"Administrator"},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"onChangeCwid",value:function(e){this.setState({cwid:e.target.value})}},{key:"onChangeFirstName",value:function(e){this.setState({firstName:e.target.value})}},{key:"onChangeLastName",value:function(e){this.setState({lastName:e.target.value})}},{key:"onChangeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"onChangeRole",value:function(e){this.setState({role:e.target.value})}},{key:"onSubmit",value:function(e){e.preventDefault();var t={cwid:this.state.cwid,firstName:this.state.firstName,lastName:this.state.lastName,email:this.state.email,password:this.state.password,role:this.state.role};this.props.RegisterAction(t),this.setState({cwid:"",firstName:"",lastName:"",email:"",password:"",role:""})}},{key:"render",value:function(){return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("div",{className:"form-group",style:{marginTop:50}},r.a.createElement("label",null,"CWID"),r.a.createElement("input",{type:"number",className:"form-control",id:"cwid",value:this.state.cwid,onChange:this.onChangeCwid,placeholder:"Campus Wide ID",required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"First Name"),r.a.createElement("input",{type:"text",className:"form-control",id:"firstName",value:this.state.firstName,onChange:this.onChangeFirstName,placeholder:"First Name",required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Last Name"),r.a.createElement("input",{type:"text",className:"form-control",id:"lastName",value:this.state.lastName,onChange:this.onChangeLastName,placeholder:"Last Name",required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Email"),r.a.createElement("input",{type:"email",className:"form-control",id:"email",value:this.state.email,onChange:this.onChangeEmail,placeholder:"Email",required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Password"),r.a.createElement("input",{type:"password",className:"form-control",id:"password",value:this.state.password,onChange:this.onChangePassword,placeholder:"Password",required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Role"),r.a.createElement("select",{type:"text",className:"form-control",value:this.state.role,onChange:this.onChangeRole},r.a.createElement("option",{id:"role",value:"Administrator"},"Administrator"),r.a.createElement("option",{id:"role",value:"Evaluator"},"Evaluator"))),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"Submit"})))}}]),t}(n.Component),R=Object(j.b)({RegisterAction:function(e){return function(t){g.a.post("http://localhost:8000/api/register",e).then(function(e){return window.location.assign("/")}).catch(function(e){t({type:N,payload:e.res.data})})}}})(S),I=(a(68),{title:"Assessment 2019",outcomes:[{description:"Communicate effectively in a variety of professional contexts.",measures:["75% or more of students evaluated on oral presentation skills will have an average BUSN 3005 rubric score of 3 or better."]}]}),M=function(e){return I.outcomes.map(function(t,a){return r.a.createElement(x,{outcome:t,reportMode:e.reportMode,state:e.state,key:a})})},x=function(e){return r.a.createElement("tr",null,r.a.createElement("th",{scope:"row"},e.outcome.description),r.a.createElement("td",null,r.a.createElement(A,{outcome:e.outcome,reportMode:e.reportMode,state:e.state})))};function A(e){return e.outcome.measures.map(function(t,a){return r.a.createElement("div",{key:a},r.a.createElement("p",null,t),e.reportMode?r.a.createElement(q,{state:e.state}):null)})}function q(e){return r.a.createElement("p",null,"Measure statistics: ",(e.state.metTarget/e.state.total*100).toFixed(2),"% of evaluations have met the target score of 3. ",e.state.total," subjects have been evaluated.")}var T=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).handleEditModeClick=a.handleEditClick.bind(Object(b.a)(a)),a.setView=a.setView.bind(Object(b.a)(a)),a.state={editMode:!1,reportMode:!1,total:0,metTarget:0},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.setView()}},{key:"setView",value:function(){"/summaryReport"===window.location.pathname&&(this.getStatistics(),this.setState({reportMode:!0}))}},{key:"getStatistics",value:function(){var e=this;g.a.get("/measureStatistics").then(function(t){console.log(t.data),e.setState({total:t.data.total,metTarget:t.data.metTarget})})}},{key:"handleEditClick",value:function(){this.setState({editMode:!0})}},{key:"render",value:function(){var e;return this.state.editMode&&(e=r.a.createElement("div",null,r.a.createElement("button",{type:"button",className:"btn btn-primary"},"Add Outcome"))),r.a.createElement("div",null,r.a.createElement("h1",null,I.title),r.a.createElement("table",{className:"table table-bordered"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{scope:"col",className:"outcome-width"},"Learning Outcomes"),r.a.createElement("th",{scope:"col",className:"measure-width"},"Measures of Performace"))),r.a.createElement("tbody",null,r.a.createElement(M,{reportMode:this.state.reportMode,state:this.state}))),e,r.a.createElement("button",{type:"button",className:"btn btn-primary",onClick:this.handleEditClick},"Edit Program Summary"))}}]),t}(n.Component),D={title:"Oral Presentation",measureId:1,scale:[[1,"1 - Limited"],[2,"2 - Developing"],[3,"3 - Capable"],[4,"4 - Strong"],[5,"5 - Excellent"]],criteria:[{description:"Subject Knowledge",scores:["student does not have grasp of info; cannot answer questions.","uncomfortable with info; able to answer very few questions.","comfortable with info; can answer simple questions.","shows full knowledge; answers questions easily but does not elaborate","knowledge is more than required; answers questions with details and elaboration"]},{description:"Organization",scores:["audience cannot understand  presentation; no logical sequence of information","audience has difficulty following; info jumps around","logical sequence with a few minor jumps","logical sequence","logical sequence;  ideas clearly linked"]},{description:"Use of Communication Aids",scores:["numerous spelling and/or  grammar errors; no  communication  aids or detracting aids","several spelling and/or grammar errors; aids highlight unimportant info","few spelling or grammar errors; aids lack originality or adequate development","two or fewer spelling or grammar errors; aids support and relate to text and presentation","no spelling or grammatical errors; aids explain and enhance text and presentation"]}]};function L(e){return D.scale.map(function(e,t){return r.a.createElement("th",{scope:"col",key:t},e[1])})}function P(e){return D.criteria.map(function(t,a){return r.a.createElement("tr",{key:a},r.a.createElement("th",{scope:"row"},t.description),r.a.createElement(V,{criteria:t}),e.gradeMode?r.a.createElement("td",null,r.a.createElement(G,{currentCriteria:t})):null)})}var F=D.scale.map(function(e,t){return r.a.createElement("option",{key:t,value:e[0]},e[1])});function G(e){return r.a.createElement("select",{className:"form-control",id:e.currentCriteria.description},r.a.createElement("option",{disabled:!0,value:!0}," -- select an option -- "),F)}function V(e){return e.criteria.scores.map(function(e,t){return r.a.createElement("td",{key:t},e)})}var W=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).onChangeSubjectId=a.onChangeSubjectId.bind(Object(b.a)(a)),a.handleSaveGradeClick=a.handleSaveGradeClick.bind(Object(b.a)(a)),a.handleAverageScoreClick=a.handleAverageScoreClick.bind(Object(b.a)(a)),a.state={gradeMode:!1,subjectID:"",averageScore:1,calcAverage:2},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.setView()}},{key:"setView",value:function(){"/gradeRubric"===window.location.pathname&&this.setState({gradeMode:!0})}},{key:"handleSaveGradeClick",value:function(){var e=D.criteria.map(function(e){return{description:e.description,value:document.getElementById(e.description).value}}),t={measureId:1,userCWID:sessionStorage.getItem("userCWID"),subjectId:this.state.subjectId,scores:e};g.a.post("/subjectScore",t).then(function(e){console.log(e.data)}),alert("The score has been saved.")}},{key:"handleAverageScoreClick",value:function(e){this.setState({calcAverage:e.target.value});var t=0,a=0;D.criteria.forEach(function(e){t+=parseInt(document.getElementById(e.description).value),a++}),console.log(t);var n=(t/a).toFixed(e.target.value);this.setState({averageScore:n})}},{key:"onChangeSubjectId",value:function(e){this.setState({subjectId:e.target.value})}},{key:"render",value:function(){var e,t,a;return this.state.gradeMode&&(e=r.a.createElement("button",{type:"button",className:"btn btn-primary",onClick:this.handleSaveGradeClick},"Save Grade"),t=r.a.createElement(r.a.Fragment,null,r.a.createElement("label",{className:"mr-2"},"Subject ID:"),r.a.createElement("input",{type:"text",placeholder:"subject Id as integer",value:this.state.value,onChange:this.onChangeSubjectId})),a=r.a.createElement("div",null,r.a.createElement("label",{className:"pr-1"},"Calculate Average"),r.a.createElement("select",{type:"button",className:"btn btn-secondary btn-sm",onClick:this.handleAverageScoreClick},r.a.createElement("option",{value:"0"},"No Decimal"),r.a.createElement("option",{value:"1"},"One Decimal"),r.a.createElement("option",{value:"2"},"Two Decimals"),r.a.createElement("option",{value:"3"},"Three Decimals")),r.a.createElement("span",{className:"pl-1"},"The average score is: ",this.state.averageScore))),r.a.createElement("div",null,r.a.createElement("h1",null,"Rubric"),r.a.createElement("div",null,r.a.createElement("span",{className:"mr-4"},this.state.gradeMode?"Grade":null," ",D.title),t),r.a.createElement("table",{className:"table table-bordered"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{scope:"col",className:"outcome-width"},"Criteria"),r.a.createElement(L,null),this.state.gradeMode?r.a.createElement("th",{scope:"col",width:"150px"},"Score"):null)),r.a.createElement("tbody",null,r.a.createElement(P,{gradeMode:this.state.gradeMode}))),a,e)}}]),t}(n.Component),B=a(75),U=["Rubric 1","Rubric 2","Rubric 3"];function _(e){return e.rubrics.map(function(e,t){return r.a.createElement("div",{key:t},r.a.createElement(B.a,{to:"/viewRubric"},e))})}var z=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Rubric List"),r.a.createElement(_,{rubrics:U}))}}]),t}(n.Component),J=a(34),K=a.n(J),$=(a(30),function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"logout",value:function(){sessionStorage.removeItem("userRole"),sessionStorage.removeItem("userCWID"),localStorage.removeItem("jwtToken"),window.location.assign("/")}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(B.a,{to:"/viewSummary",className:"navbar-brand"},"Department Evaluation"),r.a.createElement("div",{className:"collpase nav-collapse"},r.a.createElement("ul",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"navbar-item"},r.a.createElement(B.a,{to:"/viewSummary",className:"nav-link"},"View Summary")),r.a.createElement("li",{className:"navbar-item"},r.a.createElement("div",{className:"dropdown"},r.a.createElement("button",{className:"dropdown-toggle btn nav-link",id:"dropdownMenuLink","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},"Evaluations"),r.a.createElement("div",{className:"dropdown-menu bg-primary","aria-labelledby":"dropdownMenuLink"},r.a.createElement(B.a,{to:"/gradeRubric",className:"nav-link"},"My Assignments"),r.a.createElement(B.a,{to:"/rubricList",className:"nav-link"},"Make Assignments")))),r.a.createElement("li",{className:"navbar-item"},r.a.createElement(B.a,{to:"/rubricList",className:"nav-link"},"Rubrics")),r.a.createElement("li",{className:"navbar-item"},r.a.createElement(B.a,{to:"/summaryReport",className:"nav-link"},"Report")),r.a.createElement("li",{className:"navbar-item"},r.a.createElement(B.a,{to:"/viewSSummary",className:"nav-link"},"Past Assessments")),r.a.createElement("li",{className:"navbar-item"},r.a.createElement("button",{className:"btn btn-danger",onClick:this.logout},"Log Out ")))))}}]),t}(n.Component)),H=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"navbar-brand"},"Evaluator"),r.a.createElement("div",{className:"collpase nav-collapse"},r.a.createElement("ul",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"navbar-item"},r.a.createElement(B.a,{to:"/",className:"nav-link"},"Log Out")))))}}]),t}(n.Component),Q=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(B.a,{to:"/",className:"navbar-brand"},"Evaluation Application"),r.a.createElement("div",{className:"collpase nav-collapse"},r.a.createElement("ul",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"navbar-item"},r.a.createElement(B.a,{to:"/",className:"nav-link"},"Log In")),r.a.createElement("li",{className:"navbar-item"},r.a.createElement(B.a,{to:"/register",className:"nav-link"},"Register")))))}}]),t}(n.Component),X=sessionStorage.getItem("userRole"),Y=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-primary mb-4"},r.a.createElement("button",{className:"navbar-brand",target:"_blank"},r.a.createElement("img",{src:K.a,width:"50",height:"50",alt:"Not available"})),"Administrator"===X?r.a.createElement($,null):null,"Evaluator"===X?r.a.createElement(H,null):null,null===X?r.a.createElement(Q,null):null)}}]),t}(n.Component);a(69);var Z=function(e){function t(){return Object(i.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"container darkest-gray pb-2"},r.a.createElement(d.a,null,r.a.createElement("div",null,r.a.createElement(Y,null),r.a.createElement(p.a,{exact:!0,path:"/",component:O}),r.a.createElement(p.a,{exact:!0,path:"/register",component:R}),r.a.createElement(p.a,{exact:!0,path:"/viewSummary",component:T}),r.a.createElement(p.a,{exact:!0,path:"/summaryReport",component:T}),r.a.createElement(p.a,{exact:!0,path:"/viewRubric",component:W}),r.a.createElement(p.a,{exact:!0,path:"/gradeRubric",component:W}),r.a.createElement(p.a,{exact:!0,path:"/rubricList",component:z}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ee=a(13),te=a(73),ae={isAuthenticated:!1,user:{}},ne={},re=Object(ee.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ae,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case w:return{isAuthenticated:!te(t.payload),user:t.payload};default:return e}},errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case N:return t.payload;default:return e}}}),le=a(36),oe=Object(ee.d)(re,{},Object(ee.a)(le.a));document.body.classList.add("dark-gray"),localStorage.Token&&(y(localStorage.Token),oe.dispatch(C(f()(localStorage.Token)))),o.a.render(r.a.createElement(j.a,{store:oe},r.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[37,1,2]]]);
//# sourceMappingURL=main.cba654b9.chunk.js.map