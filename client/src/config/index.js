
export const signUpFormControl = [
    {
        name: 'username',
        label: 'Username',
        placeholder: 'Enter your username',
        contentType: 'input',
        type: 'text'
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Create a password',
        contentType: 'input',
        type: 'password'
    },

]

export const signInFormControl = [
    {
        name: 'username',
        label: 'Username',
        placeholder: 'Enter your username',
        contentType: 'input',
        type: 'text'
    },{
        name: 'password',
        label: 'Password',
        placeholder: 'Create a password',
        contentType: 'input',
        type: 'password'
    },

]

export const addAngelFormControl = [
    {
        name: 'username',
        label: 'Username',
        placeholder: 'Enter your username',
        contentType: 'input',
        type: 'text'
    },
    {
        name: 'gender',
        label: 'Gender',
        placeholder: 'Select Gender',
        contentType: 'select',
        type: 'text',
        options: [
            { id: 'male', label: 'Male'},
            { id: 'female', label: 'Female'},
            { id: 'undisclosed', label: 'Undisclosed'},
        ],
    },{
        name: 'dateOfBirth',
        label: 'Date of Birth',
        placeholder: 'Enter Date of Birth',
        contentType: 'date',
        type: 'date'
    },
    {
        name: 'phoneNumber',
        label: 'Phone Number',
        placeholder: 'Phone Number',
        contentType: 'number',
        type: 'number'
    },{
        name: 'price',
        label: 'Pricing',
        placeholder: 'Enter Pricing',
        contentType: 'cash',
        type: 'text'
    },
    {
        name: 'travel',
        label: 'Travel',
        placeholder: 'Select Travel Option',
        contentType: 'select',
        type: 'text',
        options: [
            { id: 'host', label: 'Host'},
            { id: 'travel', label: 'Travel'},
            { id: 'both', label: 'Host & Travel'},
        ],
    },
    ,{
        name: 'address',
        label: 'Address',
        placeholder: 'Enter Address',
        contentType: 'formGroup',
        type: 'text',
        options: [
            { 
                name: 'province',
                label: 'Province',
                placeholder: 'Enter Province',
                contentType: 'select',
                type: 'select',
                options: [
                    { id: 'gauteng', label: 'Gauteng'},
                    { id: 'freeState', label: 'Free State'},
                    { id: 'mpumalanga', label: 'Mpumalanga'},
                    { id: 'northWest', label: 'North West'},
                    { id: 'easterCape', label: 'Eastern Cape'},
                    { id: 'limpopo', label: 'Limpopo'},
                    { id: 'westernCape', label: 'Western Cape'},
                    { id: 'kwazuluNatal', label: 'Kwazulu Natal'}
                ],
            },{ 
                name: 'city',
                label: 'City',
                placeholder: 'Enter city',
                contentType: 'input',
                type: 'text'
            },{ 
                name: 'suburb',
                label: 'Suburb',
                placeholder: 'Enter Suburb',
                contentType: 'input',
                type: 'text'
            },{ 
                name: 'street',
                label: 'Street Name',
                placeholder: 'Enter Street Name',
                contentType: 'input',
                type: 'text'
            },
            { 
                name: 'houseNumber',
                label: 'House Number',
                placeholder: 'Enter House Number',
                contentType: 'number',
                type: 'number'
            },
        ],
    },{
        name: 'socialMedia',
        label: 'Social Media',
        placeholder: 'Enter Socials',
        contentType: 'formGroup',
        type: 'text',
        options: [
            { 
                name: 'facebook',
                label: 'Facebook',
                placeholder: 'Enter facebook name',
                contentType: 'input',
                type: 'text'
            },{ 
                name: 'X/Twitter',
                label: 'X/Twitter Handle',
                placeholder: 'Enter X/Twitter Handle',
                contentType: 'input',
                type: 'text'
            },{ 
                name: 'instagram',
                label: 'Instagram',
                placeholder: 'Enter Instagram Handle',
                contentType: 'input',
                type: 'text'
            },{ 
                name: 'tiktok',
                label: 'TikTok',
                placeholder: 'Enter TikTok Handle',
                contentType: 'input',
                type: 'text'
            },
        ]
    },{ 
        name: 'bio',
        label: 'Bio',
        placeholder: 'Something about the angel',
        contentType: 'textarea',
        type: 'text'
    },
]

export const angelHeaderMenuItems = [
    {
        name: 'joburg',
        label: 'Joburg',
        link: '/angels/angels'
    },{
        name: 'durban',
        label: 'Durban',
        link: '/angels/angels'
    },{
        name: 'capeTown',
        label: 'Cape Town',
        link: '/angels/angels'
    },{
        name: 'pretoria',
        label: 'Pretoria',
        link: '/angels/angels'
    },{
        name: 'dailySpecials',
        label: 'Daily Specials',
        link: '/angels/angels'
    },{
        name: 'new',
        label: 'New Angels',
        link: '/angels/angels'
    }
]

export const sortOptions = [
    { id: 'priceLowToHigh', label: 'Price: Low to High' },
    { id: 'priceHighToLow', label: 'Price: High to Low' },
    { id: 'newest', label: 'Newest' },
    { id: 'oldest', label: 'Oldest' },
    { id: 'mostPopular', label: 'Most Popular' },
    { id: 'highestRated', label: 'Highest Rated' },
    { id: 'mostFaved', label: 'Most Faved' }
]

export const angelFilterOptions = {
    province: [
        { id: 'gauteng', label: 'Gauteng'},
        { id: 'freeState', label: 'Free State'},
        { id: 'mpumalanga', label: 'Mpumalanga'},
        { id: 'northWest', label: 'North West'},
        { id: 'easternCape', label: 'Eastern Cape'},
        { id: 'limpopo', label: 'Limpopo'},
        { id: 'western Cape', label: 'Western Cape'},
        { id: 'kwazuluNatal', label: 'Kwazulu Natal'}
    ],/*
    rating: [
        {id: '1', label: '1 Star'},
        {id: '2', label: '2 Stars'},
        {id: '3', label: '3 Stars'},
        {id: '4', label: '4 Stars'},
        {id: '5', label: '5 Stars'}
    ]*/
};