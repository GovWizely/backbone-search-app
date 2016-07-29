import assign from 'object-assign';

export const TEMPLATES = assign(
  {},
  require('./defaults'),
  require('./articles'),
  require('./business_service_providers'),
  require('./consolidated_screening_list'),
  require('./de_minimis'),
  require('./how_to_articles'),
  require('./i94_cntry2015'),
  require('./i94_mpcty'),
  require('./i94_mppoe'),
  require('./ita_faqs'),
  require('./ita_office_locations'),
  require('./ita_taxonomies'),
  require('./ita_zipcode_to_post'),
  require('./market_research_library'),
  require('./privacy_shield_articles'),
  require('./starting_points'),
  require('./stop_fakes_articles'),
  require('./tariff_rates'),
  require('./tpp_rates'),
  require('./trade_articles'),
  require('./trade_events'),
  require('./trade_leads'),
  require('./web_documents')
);

export function findTemplate(templateName) {
  if (!TEMPLATES[templateName]) return TEMPLATES.defaults;
  return TEMPLATES[templateName];
}
