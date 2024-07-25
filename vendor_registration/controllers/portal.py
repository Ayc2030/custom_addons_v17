# -*- coding: utf-8 -*-

from odoo import http
from odoo.addons.portal.controllers import portal
from odoo.http import request


class PortalBase(portal.CustomerPortal):

    def _get_nav_links(self):
        # Format e.g.
        # [
        #   {
        #       'title': 'Home',
        #       'url': '/my',
        #   }
        # ]
        return []

    def _get_portal_values(self):
        return {
            'company': request.env.company,
            'title': '',
            'content_title': '',
            'nav_links': self._get_nav_links(),
        }

    @http.route(['/portal/preview'], type='http', auth="user", website=True)
    def portal_preview(self, **kw):
        values = self._get_portal_values()
        return request.render("vendor_registration.portal_preview", values)

    @http.route(['/portal/preview/success'], type='http', auth="user", website=True)
    def portal_preview_success(self, **kw):
        values = self._get_portal_values()
        return request.render("vendor_registration.portal_success_page", values)

    @http.route(['/portal/preview/error'], type='http', auth="user", website=True)
    def portal_preview_error(self, **kw):
        values = self._get_portal_values()
        return request.render("vendor_registration.portal_preview_error", values)

    @http.route(['/vendor/registration'], type='http', auth="user", methods=['GET', 'POST'], website=True)
    def vendor_registration(self, **kw):
        if request.httprequest.method == 'GET':
            portal_values = self._get_portal_values()
            countries = request.env['res.country'].sudo().search([])
            states = request.env['res.country.state'].sudo().search([])
            regions = request.env['res.country.region'].sudo().search([])
            values = {
                'countries': countries,
                'states': states,
                'regions': regions,
            }
            values.update(portal_values)
            return request.render("vendor_registration.vendor_registration_portal", values)
        else:
            pass
