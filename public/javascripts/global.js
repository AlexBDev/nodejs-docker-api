new ClipboardJS('.clipboard-copy');

$(() => {
    $('.tooltip-click').tooltip({
        trigger: 'manual',
    });

    // $('[data-toggle="modal"]').modal();

    $(document).on('click', '.tooltip-click', (ev) => {
        let $element = $(ev.currentTarget);

        $element.tooltip('toggle');
        setTimeout(() => {
            $element.tooltip('toggle');
        }, 800);
    });
});