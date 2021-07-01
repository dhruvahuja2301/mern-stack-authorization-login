$(function() {
  
    var start = moment().subtract(20, 'year');
    var end = moment().add(20,'year');
    function cb(start, end) {
        trigger(start,end)
        $('#timemenu').trigger("click");

    }
    
    $('#timemenu').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Last week': [moment().subtract(7, 'days'), moment()],
           'Last Month': [moment().subtract(30, 'days'), moment()],
           'Last 3 Months': [moment().subtract(3, 'month'), moment()],
           'Last 6 Months': [moment().subtract(6, 'month'), moment()],
           'Last year': [moment().subtract(12, 'month'), moment()],
           'Last 2 years': [moment().subtract(2, 'year'), moment()],
           'All':[moment().subtract(20, 'year'), moment().add(20,'year')]
        }
    }, cb);
    function trigger(start,end){
        $('#timemenu').val(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }
    trigger(start, end);

});