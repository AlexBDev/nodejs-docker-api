let xhr = null;

const actionStopContainer = (ev) => {
    let element = $(ev.currentTarget);
    let id = element.data('id');

    if (xhr !== null) {
        xhr.abort();
    }

    xhr = $.get('http://localhost:3000/containers/stop/'+id)
        .done(response => {
            if (response.hasOwnProperty('success') && response.success) {
                element.parents('.container-attr').remove();

                return;
            }

            alert('Unable to stop container "'+id+'"');
        });
};

$(() => {
    $('.container-action.action-stop').on('click', (ev) => {
        actionStopContainer(ev);
    });
});