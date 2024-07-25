/** @odoo-module */

import publicWidget from '@web/legacy/js/public/public_widget';

publicWidget.registry.portalBase = publicWidget.Widget.extend({
    selector: '.portal-base',

    events: {
        'change #toggle_theme': 'changeTheme',
        'click .floating-button': 'onClickFloatingButton',
        'click body': 'onClickBaseNode',
        'change select[name="country_id"]': '_onCountryChange',
        'change .file__input--file': '_onChangeFileInput',
        'click .file__value': '_onClickFileValue',
    },

    /**
     * @override
     */
    start: function () {
        var def = this._super.apply(this, arguments);

        this.$state = this.$('select[name="state_id"]');
        this.$region = this.$('select[name="region_id"]');
        this.$stateOptions = this.$state.filter(':enabled').find('option:not(:first)');
        this.$regionOptions = this.$region.filter(':enabled').find('option:not(:first)');
        this._adaptAddressForm();

        return def;
    },

    willStart: async function () {
        await this.setTheme();
    },

    setTheme: function (ev) {
       const toggleTheme = document.getElementById('toggle_theme');
       // Check if dark mode preference is stored in localStorage
       const isDarkMode = localStorage.getItem('darkMode') === 'true';
       // Set initial mode based on stored preference
       if (isDarkMode) {
           document.body.classList.add('dark-mode');
           toggleTheme.checked = true;
       } else {
           toggleTheme.checked = false;
       }
    },

    changeTheme: function (ev) {
       const isDarkMode = localStorage.getItem('darkMode') === 'true';
       if (event.target.checked) {
            document.body.classList.add('dark-mode');
       } else {
           document.body.classList.remove('dark-mode');
       }
       // Store preference in localStorage
       const isDarkModeEnabled = document.body.classList.contains('dark-mode');
       localStorage.setItem('darkMode', isDarkModeEnabled);
    },

    onClickFloatingButton: function (e) {
       e.preventDefault();
        $(this).toggleClass('open');
        if($(this).children('.fa').hasClass('fa-plus'))
        {
            $(this).children('.fa').removeClass('fa-plus');
            $(this).children('.fa').addClass('fa-close');
        }
        else if ($(this).children('.fa').hasClass('fa-close'))
        {
            $(this).children('.fa').removeClass('fa-close');
            $(this).children('.fa').addClass('fa-plus');
        }
        $('.floating-menu').stop().slideToggle();
    },

    onClickBaseNode: function (e) {
       var container = $(".floating-button");
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && $('.floating-button-wrapper').has(e.target).length === 0)
        {
            if(container.hasClass('open'))
            {
                container.removeClass('open');
            }
            if (container.children('.fa').hasClass('fa-close'))
            {
                container.children('.fa').removeClass('fa-close');
                container.children('.fa').addClass('fa-plus');
            }
            $('.floating-menu').hide();
        }

        // if the target of the click isn't the container and a descendant of the menu
        if(!container.is(e.target) && ($('.floating-menu').has(e.target).length > 0))
        {
            $('.floating-button').removeClass('open');
            $('.floating-menu').stop().slideToggle();
        }
    },

    /**
     * @private
     */
    _adaptAddressForm: function () {
        var $country = this.$('select[name="country_id"]');
        var countryID = ($country.val() || 0);
        this.$stateOptions.detach();
        var $displayedState = this.$stateOptions.filter('[data-country_id=' + countryID + ']');
        var state_nb = $displayedState.appendTo(this.$state).show().length;
        this.$state.attr('required', $displayedState.length > 0);

        this.$regionOptions.detach();
        var $displayedRegion = this.$regionOptions.filter('[data-country_id=' + countryID + ']');
        var region_nb = $displayedRegion.appendTo(this.$region).show().length;
        this.$region.attr('required', $displayedRegion.length > 0);


    },

    /**
     * @private
     */
    _onCountryChange: function () {
        this._adaptAddressForm();
    },

    _onChangeFileInput: function (ev) {
        var files = ev.target.files;
        var fileInputContainer = document.getElementById('file__input');
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var fileValueDiv = document.createElement('div');
            fileValueDiv.className = 'file__value';

            var fileTextDiv = document.createElement('div');
            fileTextDiv.className = 'file__value--text';
            fileTextDiv.textContent = file.name;

            var fileRemoveDiv = document.createElement('div');
            fileRemoveDiv.className = 'file__value--remove';
            fileRemoveDiv.setAttribute('data-id', file.name);

            fileValueDiv.appendChild(fileTextDiv);
            fileValueDiv.appendChild(fileRemoveDiv);

            fileInputContainer.insertAdjacentElement('afterend', fileValueDiv);
        }
    },

    _onClickFileValue: function (ev) {
        if (ev.target.classList.contains('file__value')) {
        ev.target.remove();
    }
    },

});

export const portalBase = publicWidget.registry.portalBase;