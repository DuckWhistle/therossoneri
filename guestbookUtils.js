  var count = 0;
  var entries = new Array();

  function addPost(s) {
    entries[count++] = s;
  }


  function replaceAll( str, from, to ) {
    var idx = str.indexOf( from );


    while ( idx > -1 ) {
        str = str.replace( from, to ); 
        idx = str.indexOf( from );
    }

    return str;
  }

  var PAGEWRAP = 20;
  var perPageArr = new Array(10, 25, 50, 100);
  var perPage = perPageArr[0];
  var reverse = false;
  var pageCount = 0;

  function display(pg) {
    for (var i = 1; i <= pageCount; i++) {
      var p = document.getElementById("pg"+i);
      if (i <= Math.ceil(entries.length/perPage))
        p.innerHTML = (i != pg) ? '<a href="#" onClick="display('+i+');return false;">['+i+']</a>': '<b>'+pg+'</b>';
      else
        p.innerHTML = "";
    }
    var c = 0;
    for (var i = pg*perPage-perPage; i < (pg*perPage-perPage)+perPageArr[perPageArr.length-1] && c<entries.length; i++) {
      var e = document.getElementById("entry" + c++);
      if (i < pg*perPage && i < entries.length) {
        e.innerHTML = "";
        if (c > 1) e.innerHTML = "<HR noshade align=left size=2 width='90%'><BR>";
        e.innerHTML += entries[reverse ? entries.length-i-1: i];
        e.style.display = 'block';
      }
      else {
        e.innerHTML = "";
        e.style.display = 'none';
      }
    }
  }
  function setPerPage(count) {
    perPage = count;
    display(1);
    for (var i = 0; i < perPageArr.length; i++) {
      var pg = perPageArr[i];
      document.getElementById("pp"+pg).innerHTML = (pg != count) ?
                                                   '<a href="#" onClick="return setPerPage('+pg+');">'+pg+'</a>&nbsp;':
                                                   '<b>'+pg+'</b>&nbsp;';
    }
    return false;
  }

  function initGuestbook(){
    document.write('<center><a href="#" onClick="reverse=!reverse;display(1);return false;">[reverse]</a>&nbsp;');
    for (var i = 1; i <= Math.ceil(entries.length/perPage); i++) {
      document.write('<span style="cursor:inherit" id="pg' + i + '"></span>&nbsp;');
      if (i % PAGEWRAP == 0) document.write('<BR>');
        pageCount++;
      }
      document.write('<BR>Per Page:&nbsp;'); 
      for (var i = 0; i < perPageArr.length; i++)
        document.write('<span id="pp'+perPageArr[i]+'"></span>');
      document.write('</center><BR><HR><BR>');
      for (var i = 0; i < perPageArr[perPageArr.length-1] && i < entries.length; i++) {
        document.write('<div style="display:block;padding:6px;"' + // + ((i%2==1) ? 'background-color:#EEEEEE;"':'"') +
                   ' id="entry' + i + '"></div>');
    }

    setPerPage(perPageArr[0]);
  }

//THE FOLLOWING IS CODE FOR THE EDITOR ONLY
var agt = navigator.userAgent.toLowerCase();
var ie = (agt.indexOf("msie") != -1);
var gecko = (agt.indexOf("gecko") != -1);

function setSelectionText( el, s )
{
var sr = el.ownerDocument.selection.createRange();
if ( !el.contains( sr.parentElement() ) )
return;
r = el.createTextRange();
sr.text = s;
}

function getSelectionText( el )
{
var sr = el.ownerDocument.selection.createRange();
if ( !el.contains( sr.parentElement() ) )
return "";
return sr.text;
}

function surroundWith(begin,end) {
if(begin.indexOf("null")!=-1 || begin=='[url=http://]' || begin=='[url=]') {
  return false;
} else {
  el = document.getElementById("editTA");

  el.focus();
  if(ie) {
    str = getSelectionText(el);
    setSelectionText(el,begin+str+end);
  } else {
    no_selection = el.selectionStart == el.selectionEnd;
    str = el.value;
    header = str.substring(0,el.selectionStart);
    sel = str.substring(el.selectionStart,el.selectionEnd);
    footer = str.substring(el.selectionEnd,str.length);
    el.value = header + begin + sel + end + footer;
    if(no_selection) {
      el.selectionStart = el.value.length - footer.length - end.length;
      el.selectionEnd = el.value.length - footer.length - end.length;
    } else {
      el.selectionStart = header.length + begin.length;
      el.selectionEnd = el.value.length - footer.length - end.length;
    }
  }
  el.focus();
}
}
function insertCode(code) {
  el = document.getElementById("editTA");
  el.focus();

  str = el.value;

  if(ie) {
    setSelectionText(el,code);
  } else if(gecko) {
    header = str.substring(0,el.selectionStart);
    footer = str.substring(el.selectionEnd,str.length);
    el.value = header + code + footer;
    el.focus();
    el.selectionStart = header.length;
    el.selectionEnd = el.value.length - footer.length;
  }
}
function previewGBEntry() {
  document.getElementById("previewMessage").value = document.getElementById("editTA").value;
  document.getElementById("previewForm").submit();
}
function submitGBEntry() {
  document.getElementById("name").value = document.getElementById("WBname").value;
  document.getElementById("email").value = document.getElementById("WBemail").value;
  document.getElementById("wbForm").submit();
}

function writeForm(userid,hiddenParams) {
var str = '';
str+='<TABLE align="center" cellpadding=2 cellspacing=0 style="border: 2px solid #000000;background-color: #FBFBFB;width: 420px;" border=0>';
str+='<TR><TD style="font:small trebuchet ms;font-weight:bold;color:#000000;"><LABEL for="WBname">Name:</LABEL></TD><TD><INPUT type="text" id="WBname" name="WBname"></TD></TR>';
str+='<TR><TD style="font:small trebuchet ms;font-weight:bold;color:#000000;"><LABEL for="WBemail">Email:</LABEL></TD><TD><INPUT type="text" id="WBemail" name="WBemail"></TD></TR>';
str+='<TR><TD colspan=2 style="border-bottom: 1px dashed #808080;background-color: #EEEEEE;">';
str+='<BUTTON title="Bold" onClick="surroundWith(\'[b]\',\'[/b]\');" style="cursor:pointer;width:26px;height:26px;padding:0px;vertical-align:middle;"><IMG alt="Bold" src="http://images.freewebs.com/MembersB/WEM/NS/Images/bold.gif" style="width:16px;height:16px;"></BUTTON>';
str+='<BUTTON title="Italic" onClick="surroundWith(\'[i]\',\'[/i]\');" style="cursor:pointer;width:26px;height:26px;padding:0px;vertical-align:middle;"><IMG alt="Italic" src="http://images.freewebs.com/MembersB/WEM/NS/Images/italic.gif" style="width:16px;height:16px;"></BUTTON>';
str+='<BUTTON title="Underline" onClick="surroundWith(\'[u]\',\'[/u]\');" style="cursor:pointer;width:26px;height:26px;padding:0px;vertical-align:middle;"><IMG alt="Underline" src="http://images.freewebs.com/MembersB/WEM/NS/Images/underline.gif" style="width:16px;height:16px;"></BUTTON>';
str+='<BUTTON title="Link" onClick="surroundWith(\'[url=\'+prompt(\'Please enter the URL you would like to link to:\',\'http://\')+\']\',\'[/url]\');" style="cursor:pointer;width:26px;height:26px;padding:0px;vertical-align:middle;"><IMG alt="Link" src="http://images.freewebs.com/MembersB/WEM/NS/Images/link.gif" style="width:16px;height:16px;"></BUTTON>';
str+='<BUTTON title="Scroll" onClick="surroundWith(\'[scroll]\',\'[/scroll]\');" style="cursor:pointer;width:50px;height:26px;padding:0px;vertical-align:middle;">Scroll</BUTTON>';
str+='<SELECT onChange="surroundWith(\'[color=\'+this.value+\']\',\'[/color]\');this.value=\'\';" style="cursor:pointer;vertical-align:middle;">';
str+='  <OPTION value="">Font Color</OPTION>';
str+='  <OPTION style="color:darkred;" value="darkred">Dark Red</OPTION>';
str+='  <OPTION style="color:red;" value="red">Red</OPTION>';
str+='  <OPTION style="color:orange;" value="orange">Orange</OPTION>';
str+='  <OPTION style="color:brown;" value="brown">Brown</OPTION>';
str+='  <OPTION style="color:yellow;" value="yellow">Yellow</OPTION>';
str+='  <OPTION style="color:green;" value="green">Green</OPTION>';
str+='  <OPTION style="color:olive;" value="olive">Olive</OPTION>';
str+='  <OPTION style="color:cyan;" value="cyan">Cyan</OPTION>';
str+='  <OPTION style="color:blue;" value="blue">Blue</OPTION>';
str+='  <OPTION style="color:darkblue;" value="darkblue">Dark Blue</OPTION>';
str+='  <OPTION style="color:indigo;" value="indigo">Indigo</OPTION>';
str+='  <OPTION style="color:violet;" value="violet">Violet</OPTION>';
str+='  <OPTION style="color:white;" value="white">White</OPTION>';
str+='  <OPTION style="color:black;" value="black">Black</OPTION></SELECT>';
str+='<SELECT onChange="surroundWith(\'[size=\'+this.value+\']\',\'[/size]\');this.value=\'\';" style="cursor:pointer;vertical-align:middle;">';
str+='<OPTION value="">Font Size</OPTION>';
str+='<OPTION value="7">Tiny</OPTION>';
str+='<OPTION value="9">Small</OPTION>';
str+='<OPTION value="12">Normal</OPTION>';
str+='<OPTION value="18">Large</OPTION>';
str+='<OPTION value="24">Huge</OPTION>';
str+='</SELECT></TD></TR><TR><TD style="width: 80px;border-right: 1px dashed #808080;">';
str+='<TABLE cellpadding=0 cellspacing=2 style="display:inline;width:80px;"><TR>';
str+='<TD><IMG alt="Angry" onClick="insertCode(\':angry:\');" src="http://images.freewebs.com/Images/Smilies/Round/angry.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Arrow" onClick="insertCode(\':arrow:\');" src="http://images.freewebs.com/Images/Smilies/Round/arrow.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Biggrin" onClick="insertCode(\':D\');" src="http://images.freewebs.com/Images/Smilies/Round/biggrin.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Blink" onClick="insertCode(\':blink:\');" src="http://images.freewebs.com/Images/Smilies/Round/blink.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Cool" onClick="insertCode(\'8)\');" src="http://images.freewebs.com/Images/Smilies/Round/cool.gif" style="cursor:pointer"></TD>';
str+='</TR><TR>';
str+='<TD><IMG alt="Dry" onClick="insertCode(\':dry:\');" src="http://images.freewebs.com/Images/Smilies/Round/dry.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Huh" onClick="insertCode(\':huh:\');" src="http://images.freewebs.com/Images/Smilies/Round/huh.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Laugh" onClick="insertCode(\':lol:\');" src="http://images.freewebs.com/Images/Smilies/Round/laugh.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Mad" onClick="insertCode(\':mad:\');" src="http://images.freewebs.com/Images/Smilies/Round/mad.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Oh My" onClick="insertCode(\':ohmy:\');" src="http://images.freewebs.com/Images/Smilies/Round/ohmy.gif" style="cursor:pointer"></TD>';
str+='</TR><TR>';
str+='<TD><IMG alt="Ph34r" onClick="insertCode(\':ph34r:\');" src="http://images.freewebs.com/Images/Smilies/Round/ph34r.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Puke" onClick="insertCode(\':puke:\');" src="http://images.freewebs.com/Images/Smilies/Round/puke.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Roll Eyes" onClick="insertCode(\':roll:\');" src="http://images.freewebs.com/Images/Smilies/Round/rolleyes.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Sad" onClick="insertCode(\':(\');" src="http://images.freewebs.com/Images/Smilies/Round/sad.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Smile" onClick="insertCode(\':)\');" src="http://images.freewebs.com/Images/Smilies/Round/smile.gif" style="cursor:pointer"></TD>';
str+='</TR><TR>';
str+='<TD><IMG alt="Tongue" onClick="insertCode(\':tongue:\');" src="http://images.freewebs.com/Images/Smilies/Round/tongue.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Unsure" onClick="insertCode(\':unsure:\');" src="http://images.freewebs.com/Images/Smilies/Round/unsure.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Wink" onClick="insertCode(\':wink:\');" src="http://images.freewebs.com/Images/Smilies/Round/wink.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Exclamation" onClick="insertCode(\':!:\');" src="http://images.freewebs.com/Images/Smilies/Round/exclamation.gif" style="cursor:pointer"></TD>';
str+='<TD><IMG alt="Question" onClick="insertCode(\':?:\');" src="http://images.freewebs.com/Images/Smilies/Round/question.gif" style="cursor:pointer"></TD>';
str+='</TR></TABLE></TD><TD>';
str+='<FORM name="wbForm" id="wbForm" action="http://members.freewebs.com/guestbookA.jsp" method="post" style="margin:0px;">';
str+='<INPUT type="hidden" name="userid" value="'+userid+'">';
str+=hiddenParams;
str+='<INPUT type="hidden" id="name" name="name">';
str+='<INPUT type="hidden" id="email" name="email">';
str+='<TEXTAREA id="editTA" name="message" style="font-family:tahoma;font-size:12px;width:295px;height:90px;"></TEXTAREA>';
str+='</FORM></TD></TR><TR><TD style="border-top: 1px dashed #808080;" align="center"><INPUT type="reset" value="Start Over"></TD>';
str+='<TD style="border-top: 1px dashed #808080;" align="right">';
str+='<INPUT type="button" value="Preview" onclick="previewGBEntry();">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
str+='<INPUT type="button" value="Post Entry" onclick="submitGBEntry();">&nbsp;</TD></TR></TABLE>';
str+='\n<FORM id="previewForm" action="http://members.freewebs.com/previewGuestbook.jsp" method="post" target="_blank"><INPUT type="hidden" name="message" id="previewMessage"></FORM>';

document.write(str);
}
