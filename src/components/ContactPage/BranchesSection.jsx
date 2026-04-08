import React from 'react';

const BranchesSection = () => {
    const branches = [
        { name: 'Al Khalidiyah Branch', address: 'Al Khalidiyah - W8, Abu Dhabi, UAE', phone: '+971 2 552 2238' },
        { name: 'Baniyas Branch', address: 'Bani Yas - EB9, Abu Dhabi, UAE', phone: '+971 2 583 3457' },
        { name: 'Shahama Branch', address: '32 Al Sa\'ay St - Al Bahyah, Abu Dhabi, UAE', phone: '+971 2 564 5324' },
        { name: 'Yasmart Branch', address: 'Bani Yas - EB13, Abu Dhabi, UAE', phone: '+971 2 583 3456' },
        { name: 'Shabiya Branch', address: 'Mohamed Bin Zayed City - ME11, Abu Dhabi, UAE', phone: '+971 2 552 2237' },
        { name: 'Mussaffah Staff City', address: 'Sanaya, Inside Lulu Staff City, Abu Dhabi, UAE', phone: '+971 2 691 1416' },
        { name: 'Baniyas Lulu', address: 'Inside Lulu Hypermarket, Baniyas East, Abu Dhabi', phone: '+971 2 691 1414' },
        { name: 'Ghayathi Branch', address: 'Inside Al Madina Hypermarket, Abu Dhabi, UAE', phone: '+971 2 691 1415' },
        { name: 'Ras Al Khaimah', address: 'Cornish Road, Ras Al Khaimah, UAE', phone: '+971 7 223 9953' }
    ];

    return (
        <div className="branches-section">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }} data-aos="fade-up">
                <h2 className="section-title">Our <span className="highlight">Branches</span></h2>
                <p className="section-subtitle">Visit us at any of our convenient locations across UAE</p>
            </div>

            <div className="branches-grid">
                {branches.map((branch, index) => (
                    <div key={index} className="branch-card" data-aos="fade-up" data-aos-delay={100 + (index * 50)}>
                        <div className="branch-icon">
                            <i className="fas fa-building"></i>
                        </div>
                        <h3 className="branch-name">{branch.name}</h3>
                        <div className="branch-details">
                            <div className="branch-detail-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <p>{branch.address}</p>
                            </div>
                            <div className="branch-detail-item">
                                <i className="fas fa-phone"></i>
                                <a href={`tel:${branch.phone.replace(/\s/g, '')}`}>{branch.phone}</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BranchesSection;
