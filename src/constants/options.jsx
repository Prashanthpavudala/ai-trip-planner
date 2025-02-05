export const SelectTravelsList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A sole travels in exploration',
      icon: '➕',
      people: '1'
    },
    {
      id: 2,
      title: 'A Couple',
      desc: 'Two travels in tandem',
      icon: '🥂',
      people: '2 People'
    },
    {
      id: 3,
      title: 'Family',
      desc: 'A group of fun loving adv',
      icon: '👨‍👩‍👧‍👦',
      people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '🎉',
        people: '5 to 10 People'
    }
  ];
  
  export const SelectBudgetOptions = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'Stay conscious of costs',
      icon: '💵',
    },
    {
      id: 2,
      title: 'Moderate',
      desc: 'Keep cost on the average side',
      icon: '💰',
    },
    {
      id: 3,
      title: 'Luxury',
      desc: 'Dont worry about cost',
      icon: '🪙',
    },
  ];

  
export const AI_PROMPT = `
Generate a Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget. Provide the output in strictly valid JSON format only, without any markdown formatting or additional text. The JSON should include a "travelPlan" object containing "hotels" and "itinerary" arrays.

The "hotels" array should contain objects with the following fields for each hotel option:

*   \`hotelName\` (string): The name of the hotel.
*   \`hotelAddress\` (string): The full address of the hotel.
*   \`price\` (number or string): The price of the hotel (can be a number or a string like "$100" or "₹5000").
*   \`hotelImageURL\` (string): URL of an image of the hotel.
*   \`geoCoordinates\` (object): An object with \`latitude\` (number) and \`longitude\` (number) properties.
*   \`hotelAddressMap\` (string): A URL for a map showing the hotel's location (e.g., a Google Maps link with the address or geo coordinates).
*   \`rating\` (number): The hotel's rating (e.g., out of 5 stars).
*   \`description\` (string): A brief description of the hotel.

The "itinerary" array should contain objects representing each day of the trip. Each day object should have the following structure:

*   \`day\` (number): The day number (from 1 to {totalDays}).
*   \`places\` (array): An array of place objects for that day.

Each "place" object within the "places" array should have the following fields:

*   \`placeName\` (string): The name of the place to visit.
*   \`placeDetails\` (string): A description or details about the place.
*   \`placeImageURL\` (string): URL of an image of the place.
*   \`geoCoordinates\` (object): An object with \`latitude\` (number) and \`longitude\` (number) properties.
*   \`ticketPricing\` (number or string): The ticket price for the place (can be a number or a string like "₹100" or "$20").
*   \`rating\` (number): The place's rating (e.g., out of 5 stars).
*   \`travelTime\` (string): Estimated travel time to reach the place from a relevant point of origin (e.g., "30 minutes," "1 hour").
*   \`bestTimeToVisit\` (string): The best time to visit the place (e.g., "Morning," "Evening," "All day") and time also .

Ensure that all fields are present in the JSON output, even if the value is null or an empty string if no information is available. Do not include any explanatory text or comments outside of the valid JSON structure. The JSON should be directly parsable by a program.
`;