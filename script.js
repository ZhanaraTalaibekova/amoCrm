define(['jquery'], function ($) {
	return function () {

		const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY5ZjcyNWEwNmZkMzU5MWM1MmVhYTVkNWQ0YzM5OTMyYWQ0M2QwYzMxYTY3ZDBmN2Q2ZWM5ZDdiOWQwMzdiMTQwZjRkMjg2MWYyN2QzYzU1In0.eyJhdWQiOiJiN2UzYjk5MC1jNGU4LTQzOTYtODdjMy1mZjA3NDhiMTYxMzQiLCJqdGkiOiI2OWY3MjVhMDZmZDM1OTFjNTJlYWE1ZDVkNGMzOTkzMmFkNDNkMGMzMWE2N2QwZjdkNmVjOWQ3YjlkMDM3YjE0MGY0ZDI4NjFmMjdkM2M1NSIsImlhdCI6MTcxNDQ3OTM4MiwibmJmIjoxNzE0NDc5MzgyLCJleHAiOjE3MTUxMjY0MDAsInN1YiI6IjEwMzczNDE0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxMjQ5MjM0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZDFkODU1ZjEtYjZjMi00NDNjLWJiOTMtZDdkMWFjYzYzNGJjIn0.aWFFBJ_D6AtR7g4luFu47uipHn27JHz1sTYyLMyPxJn8y9HU_Oe_bWPT9Gf_zXX5t9oBGgbs8-2dMHuJ0a6W_hE_K86L_1hsJi41JwwX6T3zJOlCnHcVAU1SvGDsSwbgwylR-nvqMVu0Ahzk5snQW_7GUjXyEkI90Cp0Pm-65L5BHafmsjVpUU-H1DtFJvBTgKJ380ir1Uz8q7ZCG7L11u5qiDZVsEn2-S6q6DZ-McpLOH_JHKAfWdVBweW1VNvX088D_WIx7wdEl5_gaGUmPRWw-XwN2DAHEMC97uTH4Fs2GEnOTnDGK3B3yYmwb1P14QK8MiI7k8NbV2mJg_L_rA';
		let self = this;
		let settings, w_code;
		let style = '\
		<style id="copy-lead-style">\
			.js-copy-lead {\
				background-color: #313942;\
			}\
			.js-copy-lead .card-widgets__widget__caption__logo {\
				color: #E4E4E4;\
				font-weight: bold;\
				display: block;\
				transform: translate(20px, 12px);\
				height: 0;\
				margin-left: 0;\
				padding: 0;\
			}\
			.js-copy-lead .card-widgets__widget__caption__logo_min {\
				color: #E4E4E4;\
				font-weight: bold;\
				display: block;\
				transform: translate(17px, 12px);\
				width: 0;\
				padding: 0;\
			}\
			.copy-lead .control--select--list-opened {\
				box-sizing: border-box;\
				left: 0;\
			}\
			.copy-lead .select-title {\
				padding-top: 10px;\
			}\
			.copy-lead__info {\
				margin-top: 10px;\
				text-align: center;\
				cursor: default;\
			}\
			.copy-lead__info_load {\
				color: orange;\
			}\
			.copy-lead__info_error {\
				color: red;\
			}\
			.copy-lead__info_success {\
				color: green;\
			}\
			.copy-lead__button_disable {\
				cursor: not-allowed;\
			}\
			.copy-lead__button {\
				margin-top: 10px;\
				text-align: center;\
				border: 1px solid #D4D5D8;\
				border-radius: 3px;\
				padding: 5px;\
				transition: 0.3s;\
			}\
			.copy-lead__button:hover {\
				background-color: #FBFAFB;\
			}\
		</style>';

		function getNumberVal(elem) {
			let val = $(elem).val().replace(/\s/g, '');
			return Number(val);
		}

		function numberWithSpaces(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		}


		function replaceTextSelectButton(elem, text) {
			$(elem).find('.control--select--button').text(text);
		}

		function GetLeads(pipelineId, count, size = 250) {
			let page = 1;
			let leads = [];
			for (let i = 1; i < (count / size) + 1; i++) {
				$.ajax({
					url: '/api/v4/leads?limit=' + size + '&page=' + page + '&filter[pipeline_id]=' + pipelineId,
					method: "GET",
					async: false,
					contentType: 'application/json',
					success: function (data) {
						data._embedded.leads.forEach(function (item) {
							leads.push(item);
						})
					}
				});
			}
			return leads;
		}

		this.callbacks = {
			render: function () {
				if ($('#copy-lead-style').length == 0)
					$('head').append(style);

				self.render_template({
					caption: {
						class_name: 'js-copy-lead',
						html: ''
					},
					body: '',
					render: '\
					<div class="copy-lead">\
						<p class="select-title">Воронка:</p>\
						<div class="control--select linked-form__select select-pipeline">\
							<ul class="custom-scroll control--select--list">\
								<li data-value="" class="control--select--list--item control--select--list--item-selected">\
									<span class="control--select--list--item-inner" title="Выбрать">\
										Выбрать\
									</span>\
								</li>\
							</ul>\
							\
							<button class="control--select--button" type="button" data-value="" style="border-bottom-width: 1px; background-color: #fff;">\
								<span class="control--select--button-inner">\
									Выбрать\
								</span>\
							</button>\
							\
							<input type="hidden" class="control--select--input " name="select-pipeline" value="" data-prev-value="">\
						</div>\
						<div class="copy-lead__button copy-lead__button_disable"">Скопировать</div>\
						<p class="copy-lead__info"></p>\
					</div>'
				});
				let select_pipeline = $('.copy-lead .select-pipeline');
				let statuses;
				let pipelines = {};
				$.ajax({
					method: 'GET',
					url: '/api/v4/leads/pipelines',
					dataType: 'json',
					beforeSend: function () {
						replaceTextSelectButton(select_pipeline, 'Загрузка...');
					},
					error: function () {
						replaceTextSelectButton(select_pipeline, 'Ошибка');
					},
					success: function (data) {
						replaceTextSelectButton(select_pipeline, 'Выбрать');

						data._embedded.pipelines.forEach(item => {
							let statuses = item['_embedded']['statuses'];
							pipelines[item['id']] = {
								name: item['name'],
								statuses: {}
							};
							statuses.forEach(elem => {
								if (elem.name.replace(/\s/g, '') != 'Неразобранное')
									pipelines[item['id']]['statuses'][elem['id']] = elem['name'];
							});
						});

						for (let id in pipelines) {
							let str = `
							<li data-value="${id}" class="control--select--list--item">\
								<span class="control--select--list--item-inner" title="${pipelines[id]['name']}">\
									${pipelines[id]['name']}\
								</span>\
							</li>`;
							$(str).appendTo('.copy-lead .select-pipeline .custom-scroll');
						}
					}
				});

				$('[name="select-pipeline"]').on('change', function () {
					let status_id = $(this).val();
					if (status_id != '') {
						if ($('.copy-lead .select-status').length == 0) {
							$(select_pipeline).after('\
							<p class="select-title">Этап:</p>\
							<div class="control--select linked-form__select select-status">\
								<ul class="custom-scroll control--select--list">\
									<li data-value="" class="control--select--list--item control--select--list--item-selected">\
										<span class="control--select--list--item-inner" title="Выбрать">\
											Выбрать\
										</span>\
									</li>\
								</ul>\
								\
								<button class="control--select--button" type="button" data-value="" style="border-bottom-width: 1px; background-color: #fff;">\
									<span class="control--select--button-inner">\
										Выбрать\
									</span>\
								</button>\
								\
								<input type="hidden" class="control--select--input " name="select-status" value="" data-prev-value="">\
							</div>');
						}
						if ($('.copy-lead .select-status .control--select--list--item').length > 1) {
							$('.copy-lead .select-status .control--select--list--item:not(:first-child').remove();
							$('.copy-lead .select-status .control--select--list--item').addClass('control--select--list--item-selected');
							replaceTextSelectButton('.copy-lead .select-status', 'Выбрать');
							$('[name="select-status"]').val('');
						}

						statuses = pipelines[status_id]['statuses'];
						for (let id in statuses) {
							let str = `
							<li data-value="${id}" class="control--select--list--item">\
								<span class="control--select--list--item-inner" title="${statuses[id]}">\
									${statuses[id]}\
								</span>\
							</li>`;
							$(str).appendTo('.copy-lead .select-status .custom-scroll');
						}
					} else {
						$('.copy-lead .select-status').prev().remove();
						$('.copy-lead .select-status').remove();
					}
				});

				$('.copy-lead').on('change', '[name="select-pipeline"]', function () {
					let change_id = $(this).val();
					if (change_id == '') replaceTextSelectButton($(this).parent(), 'Выбрать');
					else replaceTextSelectButton($(this).parent(), pipelines[change_id]['name']);
					$('.copy-lead__button').addClass('copy-lead__button_disable');
				});
				$('.copy-lead').on('change', '[name="select-status"]', function () {
					let change_id = $(this).val();
					if (change_id == '') {
						replaceTextSelectButton($(this).parent(), 'Выбрать');
						$('.copy-lead__button').addClass('copy-lead__button_disable');
					} else {
						replaceTextSelectButton($(this).parent(), statuses[change_id]);
						$('.copy-lead__button').removeClass('copy-lead__button_disable');
					}
				});

				$('.copy-lead__button').on('click', function () {
					if (!$(this).hasClass('copy-lead__button_disable')) {
						let pipeline_id = Number($('.copy-lead [name="select-pipeline"]').val()),
							status_id = Number($('.copy-lead [name="select-status"]').val()),
							lead_id = AMOCRM.data.current_card.id;

						$.ajax({
							url: 'https://technical1.amocrm.ru/oauth2/access_token',
							type: 'POST',
							contentType: 'application/json',
							data: JSON.stringify({
								client_id: "b7e3b990-c4e8-4396-87c3-ff0748b16134",
								client_secret: "ulqdSkSXOws0JBhNkajWmif3aEw6EEBsoqIZQAeq7BDOgoK4IuO5W615wtj45dx1",
								grant_type: "authorization_code",
								code: "def502006eb105ad01bb1dfb60b1e4cd22139fa2aa4dd3269e4f5104875212ef40c475eac94b86f529b156b19edaacb7d6876ecb06c757c1f7cf8aad6feb7c43a048719ee7f7e1987d3d2ef86a8fbc5f3d00858138b0730dd72226a4aa5b7a778554d22ce4ae8ba517883d90ea011a8f679ba3cd08e8d5601d4bb4d7229c56d260c6edf99f097d64625d94c808b0840ca96c5a240b92065e64510d0934a3a48e660437d0f3452be5eaa2e74e205c98aae54ea4ff6f05dedd0c3525b2ddc5643c0adf22f9247676229a32f3b1c53f6d6c6c575aeb96171e30c6f60b3b7d37afe76bd10f5f84100c7e2d2b586aefdc11218c3401821d63675c296e43bb3f1c866e17c7f3128687de24c98e20b5d73d2705f90b92e9e1884ffdd63c99d43c0b61f8476074f5ac9fd8b02a671143014e9cff489c4cca2b000d8ab5b5902e3866d03442fdcef2bd842542f9863f06d590574ea7dd987bba73b263fa125fb725fc498c22eedf9e0dfffdc16f96407137bc4886bb6e64282fe2cfb061c50f0a8846b6b069db5523c1c30c38d8a8b2eee36c3ba51b1ea0aba7c46159809065046ac063a8461d2bda51dabbc28b08dd33f4de808ee9780ff5131c3d79648a9b57a4852d3cc526d38957f7cdb75d075e0982096ce7c6148b68b97bc6aa06712a4f7569c4dfca957669",
								redirect_uri: "https://example.com"
							})
						});

						$.ajax({
							url: `https://technical1.amocrm.ru/api/v4/leads/${pipeline_id}`,
							type: 'GET',
							contentType: 'application/json',
							headers: {
								'Authorization': `Bearer ${accessToken}`
							},
							success: function (leadData) {
								const {
									id,
									name,
									price,
									responsible_user_id,
									group_id,
									status_id,
									pipeline_id,
									created_by,
									updated_by,
									created_at,
									updated_at,
									closed_at,
									closest_task_at,
									is_deleted,
									score,
									account_id,
									labor_cost,
									is_price_computed,
									_links
								} = leadData;

								const cleanedLeadData = {
									id,
									name,
									price,
									responsible_user_id,
									group_id,
									status_id,
									pipeline_id,
									created_by,
									updated_by,
									created_at,
									updated_at,
									closed_at,
									closest_task_at,
									is_deleted,
									score,
									account_id,
									labor_cost,
									is_price_computed,
									_links
								};

								$.ajax({
									url: 'https://technical1.amocrm.ru/api/v4/leads',
									type: 'POST',
									contentType: 'application/json',
									headers: {
										'Authorization': `Bearer ${accessToken}`
									},
									data: JSON.stringify(cleanedLeadData),
									success: function (data) {
										console.log('Lead created successfully: ', data);
									},
									error: function (error) {
										console.log('Error creating lead: ', error);
									}
								});
							},
							error: function (error) {
								console.log('Error getting lead data: ', error);
							}
						});


						if (success >= total_success) {
							$('.copy-lead__info')
								.removeClass('copy-lead__info_load copy-lead__info_error')
								.addClass('copy-lead__info_success')
								.text('Готово!');
						} else {
							$('.copy-lead__info')
								.removeClass('copy-lead__info_load copy-lead__info_success')
								.addClass('copy-lead__info_error')
								.text('Ошибка');
						}
					}
				});

				$('.js-copy-lead img').remove();
				$('.js-copy-lead span').first().after('\
					<span class="card-widgets__widget__caption__logo">Скопировать</span>\
					<span class="card-widgets__widget__caption__logo_min">Скоп</span>\
				');

				// styles
				setInterval(() => {
					if ($('.card-widgets.js-widgets-active').length > 0) {
						$('.js-copy-lead .card-widgets__widget__caption__logo').show();
						$('.js-copy-lead .card-widgets__widget__caption__logo_min').hide();
					} else {
						$('.js-copy-lead .card-widgets__widget__caption__logo').hide();
						$('.js-copy-lead .card-widgets__widget__caption__logo_min').show();
					}
				}, 100);

				$('.copy-lead').parent().css({
					'background-color': '#fff'
				});
				return true;
			},
			init: function () {
				settings = self.get_settings();
				w_code = settings.widget_code;

				return true;
			},
			bind_actions: function () {
				return true;
			},
			settings: function () {
				return true;
			},
			onSave: function () {
				return true;
			},
			destroy: function () { },
			advancedSettings: function () {
				return true;
			},
			contacts: {
				selected: function () { }
			},
			leads: {
				selected: function () { }
			},
			tasks: {
				selected: function () { }
			}
		};

		return this;
	}
});

