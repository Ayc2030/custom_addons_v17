# -*- coding: utf-8 -*-
{
    'name': 'Vendor Registration',
    'version': '1.0',
    'category': 'website',
    'summary': "Register vendors through portal",
    'description': "Register vendor through portal form by submitting vendor's details, documents etc.",
    'depends': ['base', 'web', 'portal', 'website'],
    'data': [
        'security/ir.model.access.csv',
        # 'security/security.xml',
        'views/portal_templates.xml',
        'views/vendor_registration_portal.xml'
    ],
    'demo': [],
    'installable': True,
    'auto_install': False,
    'license': 'AGPL-3',
    'assets': {
        'vendor_registration.vendor_registration_assets': [
            '/vendor_registration/static/src/scss/portal.scss',
            '/vendor_registration/static/src/js/portal.js',
            ('include', 'web._assets_helpers'),
            ('include', 'web._assets_frontend_helpers'),
            'web/static/src/scss/pre_variables.scss',
            'web/static/lib/bootstrap/scss/_variables.scss',
        ],
    },
}
