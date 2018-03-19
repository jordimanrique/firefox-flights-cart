
const storage = browser.storage.local;

console.log('carrito firefox extension');

const CP = '08021';
const ADDRESS = 'Calle aribau 185, 1a';
const PHONE = '+34 646 64 64 64';
const CITY = 'Barcelona';
const SURNAME = 'Marpinez';
const NAMES = [
    { gender : 'mrs', name : 'Sara' },
    { gender : 'mr', name : 'Sebas' },
    { gender : 'mr',  name : 'Manri' },
    { gender : 'mr',  name : 'Cyril' },
    { gender : 'mr',  name : 'Jordi' },
    { gender : 'mr',  name : 'Fran' },
    { gender : 'mrs',  name : 'Raquel' },
    { gender : 'mr',  name : 'Rafael' },
    { gender : 'mr',  name : 'José Oriol' },
    { gender : 'mr',  name : 'Iñaki' },
    { gender : 'mrs',  name : 'Judit' },
    { gender : 'mrs',  name : 'Ivana' },
    { gender : 'mr',  name : 'Napo' },
    { gender : 'mrs',  name : 'Carla' },
    { gender : 'mr',  name : 'Bauti' },
    { gender : 'mr',  name : 'Pepe' }
];

let userDefault = {
    gender: 'mr',
    name: 'Jordi',
    email: 'jordi.manrique@atrapalo.com'
};

let active = false;

$(document).ready(() => {
    validateUserFromStorage();
});

function validateUserFromStorage() {

    storage.get("defaultUserData")
        .then(refreshDefaultUserData, onError);
}

function refreshDefaultUserData(item) {
    if (item.defaultUserData) {
        refreshDefaultUser(item.defaultUserData);
    } else {
        refreshDefaultUser(userDefault);
    }
    fillForm();
}

function refreshDefaultUser(user) {
  if (user) {
    userDefault.gender = user.gender;
    userDefault.name = user.name;
    userDefault.email = user.email;
  }

  active = user.active === 'on';
}

function getDataFormStorage() {
    storage.get('defaultUserData').then((items) => {
        refreshDefaultUser(items.defaultUserData);
        fillForm();
    });
}

browser.runtime.onMessage.addListener(message => {
    switch(message.type) {
        case 'COMMAND':
            switch (message.payload) {
                case 'change-userDefault':
                    getDataFormStorage();
                    break;
        }
    }
});

function fillForm() {

    if (active) {
      let numPax = $('div[id^="bloqueAsistente_"]').length;
      let userInfo = userDefault;

      for (let indexPax = 0; indexPax < numPax; indexPax++) {
        if (indexPax !== 0) {
          userInfo = getUserInfo();
        }
        fillUserInfo(indexPax, userInfo);
      }

      $('#mp2_nombre_reg').val(userDefault.name);
      $('#mp2_email_reg').val(userDefault.email);
      $('#mp2_email_reg2').val(userDefault.email);
      $('#mp2_cp_reg').val(CP);
      $('#mp2_direccion_reg').val(ADDRESS);
      $('#mp2_poblacion_reg').val(CITY);
      $('#mp2_regione_reg').val('1').trigger('change');
      $('#mp2_movil_reg').val(PHONE);
      $('#mp2_apellidos_reg').val(SURNAME);

      $('#check_addons_rechaza').prop("checked", true);
      $('#check_seguro_cancelacion_rechaza').prop("checked", true);

      $('#mp4_num_tarjeta').val('4548812049400004');
      $('#mp4_Month').val('04').trigger('change');
      $('#mp4_Year').val(((new Date).getFullYear() + 1).toString().substr(-2)).trigger('change');
      $('#mp4_cvv').val('123');


      if($("#mp4_tipo_tarjeta option[value='VID']").length > 0) {
        $('#mp4_tipo_tarjeta').val('VID').trigger('change');
      } else if ($("#mp4_tipo_tarjeta option[value='VI']").length > 0) {
        $('#mp4_tipo_tarjeta').val('VI').trigger('change');
      }

      $('#mp312_situacion_fiscal').val('5').trigger('change');
      $('#mp312_direccion').val(ADDRESS);
      $('#mp312_telefono').val(PHONE);
      $('#mp312_ciudad').val(CITY);
      $('#mp312_provincia').val(CITY);
      $('#mp312_cp').val(CP);

      // $(window).scrollTop($('#fsCarritoBottom').offset().top);

      setTimeout(function () {
        $('#btn_finalizar_continuar').click();
        $('#sync-payer-with-asistente-0').click();
        $('#mp312_use_first_asistant_data').click();
      }, 1000);
    }
}

function getUserInfo() {
    return NAMES[Math.floor(Math.random() * NAMES.length)];
}

function fillUserInfo(index, userInfo) {
    $('#mp3_trato_asistente_' + index + '_' + userInfo.gender).prop( "checked", true );
    $('#mp3_nombre_' + index).val(userInfo.name);
    $('#mp3_f_nacimiento_dia_' + index).val($('#mp3_f_nacimiento_dia_'  + index + ' option:eq(1)').val());
    $('#mp3_f_nacimiento_mes_' + index).val($('#mp3_f_nacimiento_mes_'  + index + ' option:eq(1)').val());


    $('#mp3_f_nacimiento_anyo_' + index).val($('#mp3_f_nacimiento_anyo_'  + index + ' option:eq(10)').val());

    var selector = 'div #bloqueAsistente_' + index + ' > div.titulo-asistente';
    if ($(selector).length > 0) {
      var passengerText = $(selector)[0].innerText;

      if (passengerText.match(/\(niño\)/g) !== null || passengerText.match(/\(bebe\)/g) !== null) {
        $('#mp3_f_nacimiento_anyo_' + index).val($('#mp3_f_nacimiento_anyo_'  + index + ' option:eq(1)').val());
      }
    }

    $('#mp3_'+ index +'_caducidad_documento_dia').val($('#mp3_'+ index +'_caducidad_documento_dia option:eq(1)').val());
    $('#mp3_'+ index +'_caducidad_documento_mes').val($('#mp3_'+ index +'_caducidad_documento_mes option:eq(1)').val());
    $('#mp3_'+ index +'_caducidad_documento_anyo').val($('#mp3_'+ index +'_caducidad_documento_anyo option:eq(3)').val());

    $('#mp3_tipo_documento_' + index).val(2).trigger('change');
    $('#mp3_num_documento_' + index).val(Math.floor(Math.random()*100000000));

    setTimeout(() => {
        $('#mp3_apellidos_' + index).val(SURNAME).trigger('click');
    }, 1000);
}

function onError(error) {
    console.log(error);
}