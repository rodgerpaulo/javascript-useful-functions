/** 
 * @description - Retorna uma data no formato solicitado
 * @author - Roger Ramos <@rodgerpaulo>
 * @version - 1.0
 * @param {object} _data - Objeto contendo as configurações do retorno
 * @param {string} [_data.date=new Date()] - Data para ser formatada. Caso nenhum seja especificado, será retornado o horário atual (necessário ser um formato date válido)
 * @param {string} [_data.lang=pt_br] - Formato esperado. pt_br|es_es : DD/MM/AAAA, en_us : MM/DD/AAAA
 * @param {string} [_data.dateSeparator='/'|'-'] - Separador da data. O padrão depende do formato, americano ou brasileiro
 * @param {bool} [_data.showLeadingZero=true] - Mantém o dia e o mês em duas casas decimais
 * @param {string} [_data.dateTimeSeparator='-'] - Separador entre a data e o horáiro
 * @param {bool} [_data.showTime=false] - Exibe ou não o horário
 * @param {bool} [_data.showSeconds=false] - Exibe ou não os segundos
 * @returns {string} - Data no formato esperado
 * @example
 * // returns "8/6/2016 às 12:10:26"
 * dateFormat({
 *  date: '2016-06-08T12:10:26.09',
 *  dateTimeSeparator: 'às',
 *  showSeconds: true,
 *  showLeadingZero: false
 * });
 */
function dateFormat(_data) {
    _data = (_data || {});

    //Declaração de variáveis
    var fullDateReturn,
        day, //Dia
        month, //Mês
        year, //Ano
        hours, //Horas
        minutes, //Minutos
        seconds, //Segundos
        ds, //Separador da data
        dts, //Separador entre a data e o horário
        leadingZero; //Exibir ou não o zero em dia/mês abaixo de 10

    //verifica se o parâmetro passado é um objeto
    if (typeof (_data) === 'object' && 'date' in _data) {

        //Determina a data
        date = (new Date(_data.date) || new Date());

        //Caso a data seja um formato válido, faz a montagem
        if (date !== 'Invalid Date') {
            //Determina a linguagem
            _data.lang = (_data.lang || 'pt_br');

            //Determina o separador entre dia, mês e ano
            ds = (_data.dateSeparator = (_data.dateSeparator || (_data.lang == 'pt_br' ? '/' : '-')));

            //Exibe ou não o zero em dia/mês abaixo de 10
            leadingZero = _data.showLeadingZero;
            leadingZero = (leadingZero == undefined || leadingZero == null ? true : leadingZero);
            leadingZero = (leadingZero ? '0' : '');

            day = (leadingZero + date.getDate()).slice(-2);
            month = (leadingZero + date.getMonth()).slice(-2);
            year = date.getFullYear();
            hours = date.getUTCHours();
            minutes = date.getUTCMinutes();
            seconds = date.getUTCSeconds();

            //tratamento para adicionar o "0" no horário
            hours = (hours < 10 ? '0' + hours : hours);
            minutes = (minutes < 10 ? '0' + minutes : minutes);
            seconds = (seconds < 10 ? '0' + seconds : seconds);

            //Switch para formar a data de acordo com o país
            switch (_data.lang) {
                case 'pt_br':
                    fullDateReturn = day + ds + month + ds + year
                    break;
                case 'en_us':
                    fullDateReturn = month + ds + day + ds + year
                    break;
            }

            //Caso a opção "showTime" seja verdadeira, adiciona o horário
            if (_data.showTime == true) {
                //Determina o separador entre a data e o horário
                dts = (_data.dateTimeSeparator || '-');
                //Caso a opção "ShowSeconds" seja verdadeira, exiba os segundos
                seconds = (_data.showSeconds == true ? ':' + seconds : '');

                fullDateReturn = fullDateReturn + ' ' + dts + ' ' + hours + ':' + minutes + '' + seconds;
            }
        }
        //Caso a data não seja um formato válido, retorna a mensagem
        else {
            fullDateReturn = '[formato inválido]'
        }
    }
    else {
        fullDateReturn = '[formato inválido]';
    }
    return fullDateReturn;
}