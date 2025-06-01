import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { DefaultLayout } from '../../layouts';
import { useAuth } from '../../context/AuthContext';
import ProfileSidebar from '../../components/Profile/ProfileSidebar';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import ProfileSecurity from '../../components/Profile/ProfileSecurity';

const Profile = () => {
    const { currentUser, loading } = useAuth();
    const [activeTab, setActiveTab] = useState('info');

    // If not authenticated and not loading, redirect to login
    if (!loading && !currentUser) {
        return <Navigate to="/login" />;
    }

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Render the active tab content
    const renderContent = () => {
        switch (activeTab) {
            case 'info':
                return <ProfileInfo />;
            case 'security':
                return <ProfileSecurity />;
            default:
                return <ProfileInfo />;
        }
    };

    return (
        <DefaultLayout>
            <div className="container py-5">
                <h1 className="h3 mb-4">Tài khoản của tôi</h1>

                <div className="row">
                    <div className="col-lg-3 mb-4 mb-lg-0">
                        <ProfileSidebar activeTab={activeTab} onTabChange={handleTabChange} />
                    </div>
                    <div className="col-lg-9">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Profile;
