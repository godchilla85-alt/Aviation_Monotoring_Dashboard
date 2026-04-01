export const MOCK_AIRCRAFT = [
 
  ...Array.from({ length: 30 }, (_, i) => [
    `e${i.toString(16).padStart(5, '0')}`, 
    `EU${100 + i} `,                       
    "Europe/Misc",                       
    1711912345, 1711912345,
    (Math.random() * 50) - 10,            
    (Math.random() * 35) + 35,             
    Math.floor(Math.random() * 12000),    
    false,
    Math.floor(Math.random() * 250),      
    Math.floor(Math.random() * 360),       
    null, null, 10000, "SQ" + i, false, 0
  ]),


  ...Array.from({ length: 30 }, (_, i) => [
    `a${i.toString(16).padStart(5, '0')}`, 
    `US${200 + i} `,                       
    "United States",                       
    1711912345, 1711912345,
    (Math.random() * 59) - 125,            
    (Math.random() * 26) + 24,             
    Math.floor(Math.random() * 12000),    
    false,
    Math.floor(Math.random() * 260),       
    Math.floor(Math.random() * 360),      
    null, null, 11000, "UA" + i, false, 0
  ]),


  ...Array.from({ length: 30 }, (_, i) => [
    `as${i.toString(16).padStart(4, '0')}`, 
    `AS${300 + i} `,                        
    "Asia/Misc",                            
    1711912345, 1711912345,
    (Math.random() * 70) + 70,              
    (Math.random() * 40) + 10,              
    Math.floor(Math.random() * 12500),     
    false,
    Math.floor(Math.random() * 240),        
    Math.floor(Math.random() * 360),       
    null, null, 9000, "AS" + i, false, 0
  ])
];