import React from 'react';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import ComponentUsageExample from './ComponentUsageExample';
import { plan as examplePlan } from './ExampleData';
import Icon from './Icon';
import ExternalLink from './ExternalLink';


export default function TicketInformation({ fares }, { config }) {
  let currency;
  let regularFare;
  if (fares != null) {
    regularFare = fares.filter(fare => fare.type === 'regular')[0];

    switch (regularFare.currency) {
      case 'EUR':
      default:
        currency = '€';
    }
  }

  if (!regularFare || regularFare.cents === -1) {
    return null;
  }

  // XXX for now we only use single (first) component
  const fareId = get(regularFare, 'components[0].fareId');
  const fareMapping = get(config, 'fareMapping', {});

  const mappedFareId = fareMapping[fareId] || fareId;

  return (
    <div className="row itinerary-row itinerary-ticket-information">
      <div className="columns small-2 itinerary-ticket-layout-left"><Icon img="icon-icon_ticket" /></div>
      <div className="columns small-10 itinerary-ticket-layout-right">
        <div className="itinerary-ticket-type">
          <div className="ticket-type-zone">
            <FormattedMessage id={`ticket-type-${mappedFareId}`} />
          </div>
          <div>
            <span className="ticket-type-group">
              <FormattedMessage id="ticket-single-adult" defaultMessage="Adult" />,&nbsp;
            </span>
            <span className="ticket-type-fare">
              {`${(regularFare.cents / 100).toFixed(2)} ${currency}`}
            </span>
          </div>
        </div>
        <ExternalLink className="itinerary-ticket-external-link" href="https://www.hsl.fi/liput-ja-hinnat" >
          <FormattedMessage
            id="buy-ticket"
            defaultMessage="How to buy a ticket (HSL.fi)"
          />
        </ExternalLink>
      </div>
    </div>
  );
}

TicketInformation.propTypes = {
  fares: React.PropTypes.array,
};

TicketInformation.contextTypes = {
  config: React.PropTypes.object,
  breakpoint: React.PropTypes.string,
};

TicketInformation.displayName = 'TicketInformation';

TicketInformation.description = () =>
  <div>
    <p>Information about the required ticket for the itinerary.</p>
    <ComponentUsageExample>
      <TicketInformation fares={examplePlan.itineraries[0].fares} />
    </ComponentUsageExample>
  </div>;
