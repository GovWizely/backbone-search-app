import assign from 'object-assign';

export const TEMPLATES = assign(
  {},
  require('./defaults'),
  require('./articles'),
  require('./business_service_providers'),
  require('./consolidated_screening_list'),
  require('./de_minimis'),
  require('./ita_faqs'),
  require('./ita_office_locations'),
  require('./ita_taxonomies'),
  require('./ita_zipcode_to_post'),
  require('./market_research_library'),
  require('./tariff_rates'),
  require('./tpp_rates'),
  require('./trade_articles'),
  require('./trade_events'),
  require('./trade_leads')
);

export function findTemplate(templateName) {
  if (!TEMPLATES[templateName]) return TEMPLATES.defaults;
  return TEMPLATES[templateName];
}
