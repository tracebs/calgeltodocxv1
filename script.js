define(['jquery'], function($){
    var CustomWidget = function () {
    	var self = this;

    	var ddnumber;
		var daynum;
		var monthnum;
		var yearnum;
		var zfullname;
		var wdays;
		var zprice;
		var requisite;
		
		//getdata2
		var alltoinvioce; //список товаров
		var recieve; //получатель и грузополучатель


		this.callbacks = {
			render: function(){
				//console.log('render');

				var template = '<div><h1>Документооборот</h1>'+
                    '<button class="button-input" id="send_contract_to_drive">Договор</button>'+
					'<button class="button-input" id="send_invoice_to_drive">Счет</button>'+
					'<button class="button-input" id="save_xlsx_invoice">Товарный счет</button>'+
                    '<div id="send_result"></div>'+
                    '</div>';

                self.render_template({
                    caption:{
                        class_name:'js-ac-caption',
                        html:''
                    },
                    body:'',
                    render :  template
                });  

				return true;
			},
			init: function(){

				return true;
			},
			bind_actions: function(){
				//отправка договора
				$('#send_contract_to_drive').on('click', function(){					

					self.callbacks.getData();
					console.log('Start-OnClick-Send-Post contract v1.2');
					//console.log('OnClick-Send-Post data ddnumber -'+self.ddnumber+":");
					//console.log('OnClick-Send-Post data daynum -'+self.daynum+":");
					//console.log('OnClick-Send-Post data monthnum -'+self.monthnum+":");
					//console.log('OnClick-Send-Post data yearnum -'+self.yearnum+":");
					//console.log('OnClick-Send-Post data zfullname -'+self.zfullname+":");
					//console.log('OnClick-Send-Post data wdays -'+self.wdays+":");
					//console.log('OnClick-Send-Post data zprice -'+self.zprice+":");
					//console.log('OnClick-Send-Post data requisite -'+self.requisite+":");

					self.crm_post ( 
			          	'http://calgel.ru/esp/wc.php',
				        {
				        	ftype: "contract",
				          	ddnumber: self.ddnumber,
							daynum: self.daynum,
							monthnum: self.monthnum,
							yearnum: self.yearnum,
							zfullname: self.zfullname,
							wdays: self.wdays,
							zprice: self.zprice,
							requisite: self.requisite
				        },
				        function(msg) {
				        	console.log(msg);
				        	if (msg.auth_link){
				        		$('#send_result').html("<a href='"+msg.auth_link+"' target='_blank'>Авторизовать</a>");
				        	}
				        	else {
				        		self.callbacks.updateTextarea("Договор", msg);
								self.callbacks.updateLink(msg);
								//updateDocument
								self.callbacks.updateDocument(msg);
							}

				        },
			        	'json'
			      	);
					console.log('Finish-OnClick-Send-Post');

				});
				//отправка счета в гуглдрайв
				$('#send_invoice_to_drive').on('click', function(){

					self.callbacks.getData();
					console.log('Start-OnClick-Send-Post invoice v1.2');
					console.log('OnClick-Send-Post data invoice ddnumber -'+self.ddnumber+":");
					console.log('OnClick-Send-Post data invoice ddate -'+self.ddate+":");
					//console.log('OnClick-Send-Post data invoice monthnum -'+self.monthnum+":");
					//console.log('OnClick-Send-Post data invoice yearnum -'+self.yearnum+":");
					console.log('OnClick-Send-Post data invoice zfullname -'+self.zfullname+":");
					//console.log('OnClick-Send-Post data wdays -'+self.wdays+":");
					console.log('OnClick-Send-Post data invoice zprice -'+self.zprice+":");
					//console.log('OnClick-Send-Post data requisite -'+self.requisite+":");

					self.crm_post (
						'http://calgel.ru/esp/wc.php',
						{
							ftype: "invoice",
							ddnumber: self.ddnumber,
							ddate: self.ddate,
							zfullname: self.zfullname,
							zprice: self.zprice,
							zpricetext: self.zprice
						},
						function(msg) {
							console.log(msg);
							if (msg.auth_link){
								$('#send_result').html("<a href='"+msg.auth_link+"' target='_blank'>Авторизовать</a>");
							}
							else {
								self.callbacks.updateTextarea("Счет", msg);
								self.callbacks.updateLink2(msg);
								//updateDocument
								self.callbacks.updateDocument(msg);
							}

						},
						'json'
					);
					console.log('Finish-OnClick-Send-Post');

				});
				//отправка счета в гуглдрайв
				$('#save_xlsx_invoice').on('click', function(){
					
					console.log('save_xlsx_invoice - start');
					self.callbacks.getData2();
					console.log('save_xlsx_invoice - send post');
					self.crm_post (
						'http://calgel.ru/esp/wc.php',
						{
							ftype: "tradeinvoice",
							ddnumber: self.ddnumber,
							ddate: self.ddate,	
							recieve: self.recieve,							
							alltoinvioce: self.alltoinvioce,
							recieve: self.recieve
						},
						function(msg) {
							console.log(msg);
							if (msg.auth_link){
								$('#send_result').html("<a href='"+msg.auth_link+"' target='_blank'>Авторизовать</a>");
							} else {
								self.callbacks.updateTextarea("Товарный счет", msg);
								self.callbacks.updateLink3(msg);
								//updateDocument
								self.callbacks.updateDocument(msg);
							}

						},
						'json'
					);

				});	
				//console.log(self.system().area);		
				
				
				return true;
			},
			settings: function(){

				return true;
			},
			onSave: function(){

				return true;
			},
			destroy: function(){
				
			},
			contacts: {
					//select contacts in list and clicked on widget name
					selected: function(){
						
					}
				},
			leads: {
					//select leads in list and clicked on widget name
					selected: function(){
						
					}
				},
			tasks: {
					//select taks in list and clicked on widget name
					selected: function(){
						
					}
				},
				
			getData: function(){
					console.log('StartGetData');
					self.ddnumber = $('input[name="CFV[813270]"]').val();
					var today = new Date();
					self.daynum = "" + today.getDate();
					var mmonth = today.getMonth()+1;
					if (mmonth==1) {
						self.monthnum = "января";
					} else if(mmonth==2) {
						self.monthnum = "февраля";
					} else if(mmonth==3) {
						self.monthnum = "марта";
					} else if(mmonth==4) {
						self.monthnum = "апреля";
					} else if(mmonth==5) {
						self.monthnum = "мая";
					} else if(mmonth==6) {
						self.monthnum = "июня";
					} else if(mmonth==7) {
						self.monthnum = "июля";
					} else if(mmonth==8) {
						self.monthnum = "августа";
					} else if(mmonth==9) {
						self.monthnum = "сентября";
					} else if(mmonth==10) {
						self.monthnum = "октября";
					} else if(mmonth==11) {
						self.monthnum = "ноября";
					} else if(mmonth==12) {
						self.monthnum = "декабря";
					} else {

					}
					//self.monthnum = "" + (today.getMonth()+1); //January is 0!
					self.yearnum = "" + today.getFullYear();
					self.ddate = "" + today.getDate() + "."+ (today.getMonth()+1)+"."+today.getFullYear();
					self.zfullname = $('input[name="contact[NAME]"]').val();
					tmpwdays = $('input[name="CFV[813354]"]').val();
					if (tmpwdays=='1948330') {
						self.wdays = 2;
						self.zprice = 7800;
					} else if (tmpwdays=='1948332') {
						self.wdays = 10;
						self.zprice = 25800;
					} else if (tmpwdays=='1948334') {
						self.wdays = 21;
						self.zprice = 45800;
					} else {

					}
					self.requisite = $('textarea[name="CFV[813368]"]').val();
					console.log('FinishGetData');
			},
			getData2: function(){
				console.log('Start GetData2!');
				//текущая дата
				var today = new Date();
				self.daynum = "" + today.getDate();
				var mmonth = today.getMonth()+1;
				if (mmonth==1) {
					self.monthnum = "января";
				} else if(mmonth==2) {
					self.monthnum = "февраля";
				} else if(mmonth==3) {
					self.monthnum = "марта";
				} else if(mmonth==4) {
					self.monthnum = "апреля";
				} else if(mmonth==5) {
					self.monthnum = "мая";
				} else if(mmonth==6) {
					self.monthnum = "июня";
				} else if(mmonth==7) {
					self.monthnum = "июля";
				} else if(mmonth==8) {
					self.monthnum = "августа";
				} else if(mmonth==9) {
					self.monthnum = "сентября";
				} else if(mmonth==10) {
					self.monthnum = "октября";
				} else if(mmonth==11) {
					self.monthnum = "ноября";
				} else if(mmonth==12) {
					self.monthnum = "декабря";
				} else {

				}
				//self.monthnum = "" + (today.getMonth()+1); //January is 0!
				self.yearnum = "" + today.getFullYear();
				self.ddate = "" + today.getDate() + "."+ (today.getMonth()+1)+"."+today.getFullYear();
					
				self.ddnumber = $('input[name="CFV[813270]"]').val()+"-т";
				self.recieve = $('input[name="contact[NAME]"]').val();
				//CFV[813368]
				self.recieve = self.recieve +" "+ $('textarea[name="CFV[813368]"]').val();
				
				//gels========================
				self.alltoinvioce = "";
				$('.tr_wrapper_686024').each(function(){					
					$(this).find('.checkboxes_dropdown__label').each(function(){
						chvarr = $(this).find('input[type="checkbox"]');
						varr = chvarr.val();
						htmll = $(this).find('.checkboxes_dropdown__label_title').html();
						if (chvarr.prop("checked")) {
							self.alltoinvioce = self.alltoinvioce + htmll.replace("\n|\r\n", " ").trim()+"!-!"
							//varr = varr + "(checked)";
						}
					})				
				});
				//liquids============================
				$('.tr_wrapper_686044').each(function(){					
					$(this).find('.checkboxes_dropdown__label').each(function(){
						chvarr = $(this).find('input[type="checkbox"]');
						varr = chvarr.val();
						htmll = $(this).find('.checkboxes_dropdown__label_title').html();
						if (chvarr.prop("checked")) {
							self.alltoinvioce = self.alltoinvioce + htmll.replace("\n|\r\n", " ").trim()+"!-!"
							//varr = varr + "(checked)";
						}
					})				
				});						
				//buffs============================
				$('.tr_wrapper_686072').each(function(){					
					$(this).find('.checkboxes_dropdown__label').each(function(){
						chvarr = $(this).find('input[type="checkbox"]');
						varr = chvarr.val();
						htmll = $(this).find('.checkboxes_dropdown__label_title').html();
						if (chvarr.prop("checked")) {
							self.alltoinvioce = self.alltoinvioce + htmll.replace("\n|\r\n", " ").trim()+"!-!"
							//varr = varr + "(checked)";
						}
					})				
				});		
				//brush============================
				$('.tr_wrapper_686080').each(function(){					
					$(this).find('.checkboxes_dropdown__label').each(function(){
						chvarr = $(this).find('input[type="checkbox"]');
						varr = chvarr.val();
						htmll = $(this).find('.checkboxes_dropdown__label_title').html();
						if (chvarr.prop("checked")) {
							self.alltoinvioce = self.alltoinvioce + htmll.replace("\n|\r\n", " ").trim()+"!-!"
							//varr = varr + "(checked)";
						}
					})				
				});		
				//mogalamp============================
				$('.tr_wrapper_686086').each(function(){										
					chvarr = $(this).find('input[type="checkbox"]');
					varr = chvarr.val();
					//htmll = $(this).find('.checkboxes_dropdown__label_title').html();
					if (chvarr.prop("checked")) {
						self.alltoinvioce = self.alltoinvioce + "Лампа MOGA BROOK"+"!-!"
						//varr = varr + "(checked)";
					}
					
				});		
				//care============================
				$('.tr_wrapper_686090').each(function(){					
					$(this).find('.checkboxes_dropdown__label').each(function(){
						chvarr = $(this).find('input[type="checkbox"]');
						varr = chvarr.val();
						htmll = $(this).find('.checkboxes_dropdown__label_title').html();
						if (chvarr.prop("checked")) {
							self.alltoinvioce = self.alltoinvioce + htmll.replace("\n|\r\n", " ").trim()+"!-!"
							//varr = varr + "(checked)";
						}
					})				
				});		
				//все телефоны
				phones1201 = "";
				$('[data-pei-code=phone]').each(function(){
					phonearr = $(this).find('.text-input').val();
					if (phonearr=== undefined) {
						
					} else {
						if (phonearr.length>=5) {
							phones1201 = phones1201+"тел."+phonearr+";";
						}
					}					
				});	
				
				console.log('Phone:'+phones1201);
				self.recieve = self.recieve +" "+phones1201;
				//console.log(self.alltoinvioce);
				console.log('Finish GetData2');
			},	
			updateDocument: function(msg){
				console.log('updateDocument');				
				$('.card-top-save-button').removeClass('button-input-disabled').trigger('click');
			},
			updateTextarea: function(txt, msg){
				console.log('UpdateTextArea');
				$('#send_result').html("");
				var restxt =txt+" ";
				restxt = restxt+" : ";
				restxt = restxt+msg.dl_link;
				$('.note-edit__body > textarea').trigger('focusin').val(restxt);
				$('.note-edit__actions__submit').removeClass('button-input-disabled').trigger('click');
			},
			updateLink: function(msg){
				console.log('UpdateLink v1:');
				$('#send_result').html("");
				//msg.edit_link - ссылка на редактирование
				//msg.dl_link - ссылка на скачивание
				var restxt = "" + msg.edit_link;
				console.log('UpdateLink v2:' + restxt);
				$('input[name="CFV[813398]"]').val(restxt);
			},
			updateLink2: function(msg){
				//CFV[820188]
				console.log('UpdateLink2 v1:');
				$('#send_result').html("");
				var restxt = "" + msg.edit_link;
				console.log('UpdateLink2 v2:' + restxt);
				$('input[name="CFV[820188]"]').val(restxt);
			},
			updateLink3: function(msg){
				//CFV[856228]
				console.log('UpdateLink3 v1:');
				$('#send_result').html("");
				var restxt = "" + msg.edit_link;
				console.log('UpdateLink3 v2:' + restxt);
				$('input[name="CFV[856228]"]').val(restxt);
			}
		};
		return this;
    };


return CustomWidget;
});