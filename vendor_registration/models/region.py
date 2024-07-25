# -*- coding: utf-8 -*-

from odoo import models, fields


class Region(models.Model):
    _name = 'res.country.region'
    _description = 'Region'

    name = fields.Char('Name', required=True)
    country_id = fields.Many2one(string="Country", comodel_name='res.country', required=True)
    region_arabic_name = fields.Char('Name in Arabic', required=True)
    region_code = fields.Char('Code')
