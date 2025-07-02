import React, { useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { FaSearch, FaBalanceScale, FaHandshake, FaShieldAlt, FaUsers, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaCheck, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    return (
        <div className="font-sans text-black relative">
            <header className="bg-gradient-to-r from-[#0E44A4] to-[#1167CC] text-white shadow-md">
                <div className="flex flex-col md:flex-row items-center justify-between py-7 px-10 md:px-2 max-w-6xl mx-auto">
                    <div className="flex flex-col items-center space-x-2 text-center">
                        <img src="/logo.png" alt="Matterhorn Logo" className="w-50 h-12 mb-1" />
                    </div>

                    <div className="flex space-x-3">
                        <FaFacebookF className="text-white hover:text-blue-400 cursor-pointer transition-colors" />
                        <FaLinkedinIn className="text-white hover:text-blue-400 cursor-pointer transition-colors" />
                        <FaXTwitter className="text-white hover:text-blue-400 cursor-pointer transition-colors" />
                        <FaYoutube className="text-white hover:text-blue-400 cursor-pointer transition-colors" />
                    </div>

                </div>
            </header>

            {/* Floating Nav Bar */}
            <div className="relative z-10">
                <div className="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl bg-white rounded-md shadow-md flex flex-col md:flex-row justify-between items-center px-4 py-3">
                    {/* Search Bar */}
                    <div className="flex items-center bg-blue-50 rounded-md px-3 py-2 mb-2 md:mb-0 border border-white">
                        <FaSearch className="text-blue-400 text-lg mr-2" />
                        <input
                            type="text"
                            placeholder="Search legal services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 w-45"
                        />
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-wrap justify-center gap-4 text-sm font-medium text-black mb-2 md:mb-0 md:ml-4">
                        <a href="#" className="hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-all duration-300">HOME</a>
                        <a href="#" className="hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-all duration-300">ABOUT US</a>
                        <a href="#" className="hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-all duration-300">SERVICES</a>
                        <a href="#" className="hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-all duration-300">BLOG</a>
                        <a href="#" className="hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-all duration-300">CONTACT</a>
                    </nav>

                    {/* Buttons */}
                    <div className="flex space-x-2">
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-white text-blue-700 px-4 py-1 rounded-md shadow hover:bg-blue-50 hover:text-blue-800 font-semibold text-sm transition-all duration-300 cursor-pointer"
                        >
                            SIGN IN
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-white text-blue-700 px-4 py-1 rounded-md shadow hover:bg-blue-50 hover:text-blue-800 font-semibold text-sm transition-all duration-300 cursor-pointer"
                        >
                            SIGN UP
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative flex flex-col items-start justify-center px-4 md:px-8 pt-24 pb-12 max-w-7xl mx-auto text-left min-h-1/2 overflow-hidden">
                {/* Background Images - Positioned Left & Right */}
                <div className="absolute inset-0 -z-10">
                    {/* Graph on Left */}
                    <img
                        src="/img2.png"
                        alt="Graph background"
                        className="absolute top-0 left-0 h-full w-1/2 object-cover opacity-100"
                    />
                    {/* Law Illustration on Right */}
                    <img
                        src="/img1.png"
                        alt="Law illustration background"
                        className="absolute top-0 right-0 h-full w-1/2 object-cover opacity-100"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 text-left max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        CHANGING THE <br />
                        <span className="text-blue-700">BUSINESS OF LAW</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-800 mb-8">
                        Expert legal solutions for modern businesses. We provide comprehensive legal services
                        to help your company navigate complex regulatory landscapes and achieve sustainable growth.
                    </p>
                    <button className="mt-6 bg-blue-700 text-white px-8 py-3 rounded-md hover:bg-blue-800 hover:scale-105 shadow-md font-semibold text-lg transition-all duration-300">
                        GET STARTED
                    </button>
                </div>
            </section>



            {/* Services Section - Dark Blue Background */}
            <section className="bg-slate-900 text-white py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Legal Services</h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Comprehensive legal expertise tailored to your business needs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105">
                            <FaBalanceScale className="text-4xl text-blue-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Corporate Law</h3>
                            <p className="text-gray-300">Formation, governance, and compliance for businesses of all sizes.</p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105">
                            <FaHandshake className="text-4xl text-green-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Contract Law</h3>
                            <p className="text-gray-300">Drafting, reviewing, and negotiating contracts to protect your interests.</p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105">
                            <FaShieldAlt className="text-4xl text-red-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Intellectual Property</h3>
                            <p className="text-gray-300">Protecting your innovations, trademarks, and creative assets.</p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105">
                            <FaUsers className="text-4xl text-purple-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-3">Employment Law</h3>
                            <p className="text-gray-300">Workplace policies, disputes, and compliance with labor regulations.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section - Light Gray Background */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                                Why Choose <span className="text-blue-700">Matterhorn</span>?
                            </h2>
                            <p className="text-gray-600 text-lg mb-6">
                                With over 25 years of combined experience, our team of legal experts
                                has helped thousands of businesses navigate complex legal challenges
                                and achieve their goals.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center">
                                    <FaCheck className="text-green-500 mr-3" />
                                    <span className="text-gray-700">Experienced legal professionals</span>
                                </div>
                                <div className="flex items-center">
                                    <FaCheck className="text-green-500 mr-3" />
                                    <span className="text-gray-700">Personalized legal strategies</span>
                                </div>
                                <div className="flex items-center">
                                    <FaCheck className="text-green-500 mr-3" />
                                    <span className="text-gray-700">Transparent pricing structure</span>
                                </div>
                                <div className="flex items-center">
                                    <FaCheck className="text-green-500 mr-3" />
                                    <span className="text-gray-700">24/7 client support</span>
                                </div>
                            </div>

                            <button className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition-all duration-300 flex items-center">
                                Learn More <FaArrowRight className="ml-2" />
                            </button>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Our Track Record</h3>
                            <div className="grid grid-cols-2 gap-6 text-center">
                                <div>
                                    <div className="text-3xl font-bold text-blue-700 mb-2">500+</div>
                                    <div className="text-gray-600">Cases Won</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-blue-700 mb-2">1000+</div>
                                    <div className="text-gray-600">Happy Clients</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-blue-700 mb-2">25+</div>
                                    <div className="text-gray-600">Years Experience</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-blue-700 mb-2">98%</div>
                                    <div className="text-gray-600">Success Rate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section - Blue Background */}
            <section className="bg-blue-800 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
                        <p className="text-blue-100 text-lg">
                            Don't just take our word for it - hear from our satisfied clients
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-4">
                                "Matterhorn provided exceptional legal guidance during our company merger.
                                Their expertise and attention to detail were invaluable."
                            </p>
                            <div className="font-semibold text-gray-800">Sarah Johnson</div>
                            <div className="text-gray-600 text-sm">CEO, TechStart Inc.</div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-4">
                                "Professional, responsive, and results-driven. They helped us navigate
                                complex employment law issues with ease."
                            </p>
                            <div className="font-semibold text-gray-800">Michael Chen</div>
                            <div className="text-gray-600 text-sm">HR Director, Global Corp</div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-4">
                                "Outstanding intellectual property protection services.
                                They secured our patents efficiently and cost-effectively."
                            </p>
                            <div className="font-semibold text-gray-800">Emily Rodriguez</div>
                            <div className="text-gray-600 text-sm">Founder, Innovation Labs</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Gradient Background */}
            <section className="bg-gradient-to-r from-slate-800 to-slate-900 py-16">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Schedule a free consultation with our legal experts and discover how we can help
                        your business thrive in today's competitive landscape.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all duration-300 font-semibold">
                            Schedule Consultation
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-gray-800 transition-all duration-300 font-semibold">
                            Call Now: (555) 123-4567
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div>
                            <div className="flex items-center mb-4">
                                <img src="/favicon-2.png" alt="Matterhorn Logo" className="w-8 h-8 mr-2" />
                                <div>
                                    <h3 className="font-bold text-lg">MATTERHORN</h3>
                                    <p className="text-xs text-gray-400">BACK OFFICE SOLUTIONS</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm mb-4">
                                Expert legal services for modern businesses.
                                Your trusted partner in legal excellence.
                            </p>
                            <div className="flex items-center space-x-4 mt-4 md:mt-0 text-lg">
                                <div className="bg-[#3b5998] text-white p-2 rounded-full hover:scale-110 transition-all duration-300 cursor-pointer">
                                    <FaFacebookF />
                                </div>
                                <div className="bg-[#0077b5] text-white p-2 rounded-full hover:scale-110 transition-all duration-300 cursor-pointer">
                                    <FaLinkedinIn />
                                </div>
                                <div className="bg-black text-white p-2 rounded-full hover:scale-110 transition-all duration-300 cursor-pointer">
                                    <FaXTwitter />
                                </div>
                                <div className="bg-[#FF0000] text-white p-2 rounded-full hover:scale-110 transition-all duration-300 cursor-pointer">
                                    <FaYoutube />
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="font-semibold mb-4">Services</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Corporate Law</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contract Law</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">IP Protection</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Employment Law</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Legal Consultation</a></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-semibold mb-4">Contact Info</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="text-blue-400 mr-2" />
                                    <span className="text-gray-400">123 Legal Street, Law City, LC 12345</span>
                                </div>
                                <div className="flex items-center">
                                    <FaPhone className="text-blue-400 mr-2" />
                                    <span className="text-gray-400">(555) 123-4567</span>
                                </div>
                                <div className="flex items-center">
                                    <FaEnvelope className="text-blue-400 mr-2" />
                                    <span className="text-gray-400">info@matterhorn.law</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 Matterhorn Back Office Solutions. All rights reserved. |
                            <a href="#" className="hover:text-white ml-1">Privacy Policy</a> |
                            <a href="#" className="hover:text-white ml-1">Terms of Service</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;