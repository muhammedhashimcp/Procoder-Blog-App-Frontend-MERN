import React, { useState, useRef, useEffect } from 'react';

import {
	Formik,
	Form,
	Field,
	ErrorMessage,
	FieldArray,
	FastField,
} from 'formik';
import DropZone from 'react-dropzone';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';
import { createPostAction } from '../../redux/slices/posts/postSlices';
import CategoriesOptions from '../Categories/CategoriesOptions';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';

import TextError from './TextError';

const initialValues = {
	title: '',
	description: '',
	category: '',
	blogBannerImage: '',
	blogIconImage: '',
	tags: [''],
};

const savedValues = {
	name: 'Vishwas',
	email: 'v@example.com',
	channel: 'codevolution',
	comments: 'Welcome to Formik',
	address: '221B Baker Street',
	social: {
		facebook: '',
		twitter: '',
	},
	phoneNumbers: ['', ''],
	phNumbers: [''],
};

const onSubmit = (values, submitProps) => {
	console.log('Form data', values);
	console.log('submitProps', submitProps);
	// dispatch the action
	const data = {
		category: values?.category?.label,
		title: values?.title,
		description: values?.description,
		blogBannerImage: values?.blogBannerImage,
		blogIconImage: values?.blogIconImage,
		tags: values?.tags,
	};

	console.log('🚀 ~ file: CreatePost.js ~ line 75 ~ CreatePost ~ data', data);
	dispatch(createPostAction(data));

	submitProps.setSubmitting(false);
	submitProps.resetForm();
};
// Form schema
const validationSchema = Yup.object({
	title: Yup.string().required('Title is required'),
	description: Yup.string().required('Description is required'),
	category: Yup.object().required('Category is required'),
	blogBannerImage: Yup.string().required('Banner Image is required'),
	blogIconImage: Yup.string().required('Blog Icon Image is required'),
});

const validateComments = (value) => {
	let error;
	if (!value) {
		error = 'Required';
	}
	return error;
};
const Container = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
border-width: 2px;
border-radius: 2px;
border-style: dashed;
background-color: #fafafa;
color: #bdbdbd;
border-color: gray
transition: border 0.24s ease-in-out;
`;
function YoutubeForm() {
	const [formValues, setFormValues] = useState(null);
	const [tags, setTags] = useState([]);

	const editor = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// select store data
	const post = useSelector((state) => state?.post);
	const { isCreated, loading, appErr, serverErr } = post;

	if (isCreated) navigate('/posts');
	//Banner  Image Preview
	const [blogBannerPreview, setBlogBannerPreview] = useState('');
	let blogBannerImage = formik?.values?.blogBannerImage;
	useEffect(() => {
		if (blogBannerImage) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setBlogBannerPreview(reader.result);
			};
			reader.readAsDataURL(blogBannerImage);
		} else {
			setBlogBannerPreview(null);
		}
	}, [blogBannerImage]);

	//Blog Icon Image Preview
	const [blogIconImagePreview, setBlogIconImagePreview] = useState('');

	let blogIconImage = formik?.values?.blogIconImage;
	useEffect(() => {
		if (blogIconImage) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setBlogIconImagePreview(reader.result);
			};
			reader.readAsDataURL(blogIconImage);
		} else {
			setBlogIconImagePreview(null);
		}
	}, [blogIconImage]);

	// description box
	const config = {
		zIndex: 0,
		readonly: false,
		activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
		toolbarButtonSize: 'middle',
		theme: 'default',
		enableDragAndDropFileToEditor: true,
		enter: 'BR',
		saveModeInCookie: false,
		spellcheck: true,
		editorCssClass: false,
		triggerChangeEvent: true,
		height: 300,
		direction: 'ltr',
		language: 'en',
		debugLanguage: false,
		i18n: 'en',
		tabIndex: -1,
		toolbar: true,

		useSplitMode: false,
		colorPickerDefaultTab: 'background',
		imageDefaultWidth: 500,
		// removeButtons: ['source', 'fullsize', 'about', 'outdent', 'indent', 'video', 'print', 'table', 'fontsize', 'superscript', 'subscript', 'file', 'cut', 'selectall'],
		// disablePlugins: ['paste', 'stat'],
		events: {},
		textIcons: false,
		uploader: {
			insertImageAsBase64URI: true,
		},
		placeholder: 'Start typing',
		showXPathInStatusbar: false,
	};
	return (
		<Formik
			initialValues={formValues || initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
			enableReinitialize
			// validateOnChange={false}
			// validateOnBlur={false}
			// validateOnMount
		>
			{(formik) => {
				console.log('Formik props', formik);
				return (
					<Form>
						<div className="form-control">
							<label htmlFor="name">Name</label>
							<Field type="text" id="name" name="name" />
							<ErrorMessage name="name" component={TextError} />
						</div>

						<div className="form-control">
							<label htmlFor="email">Email</label>
							<Field type="email" id="email" name="email" />
							<ErrorMessage name="email">
								{(error) => (
									<div className="error">{error}</div>
								)}
							</ErrorMessage>
						</div>

						<div className="form-control">
							<label htmlFor="channel">Channel</label>
							<Field
								type="text"
								id="channel"
								name="channel"
								placeholder="YouTube channel name"
							/>
							<ErrorMessage name="channel" />
						</div>

						<div className="form-control">
							<label htmlFor="comments">Comments</label>
							<Field
								as="textarea"
								id="comments"
								name="comments"
								validate={validateComments}
							/>
							<ErrorMessage
								name="comments"
								component={TextError}
							/>
						</div>

						<div className="form-control">
							<label htmlFor="address">Address</label>
							<FastField name="address">
								{({ field, form, meta }) => {
									// console.log('Field render')
									return (
										<div>
											<input type="text" {...field} />
											{meta.touched && meta.error ? (
												<div>{meta.error}</div>
											) : null}
										</div>
									);
								}}
							</FastField>
						</div>

						<div className="form-control">
							<label htmlFor="facebook">Facebook profile</label>
							<Field
								type="text"
								id="facebook"
								name="social.facebook"
							/>
						</div>

						<div className="form-control">
							<label htmlFor="twitter">Twitter profile</label>
							<Field
								type="text"
								id="twitter"
								name="social.twitter"
							/>
						</div>

						<div className="form-control">
							<label htmlFor="primaryPh">
								Primary phone number
							</label>
							<Field
								type="text"
								id="primaryPh"
								name="phoneNumbers[0]"
							/>
						</div>

						<div className="form-control">
							<label htmlFor="secondaryPh">
								Secondary phone number
							</label>
							<Field
								type="text"
								id="secondaryPh"
								name="phoneNumbers[1]"
							/>
						</div> 

						<div className="form-control">
							<label>List of phone numbers</label>
							<FieldArray name="phNumbers">
								{(fieldArrayProps) => {
									const { push, remove, form } =
										fieldArrayProps;
									const { values } = form;
									const { phNumbers } = values;
									// console.log('fieldArrayProps', fieldArrayProps)
									// console.log('Form errors', form.errors)
									return (
										<div>
											{phNumbers.map(
												(phNumber, index) => (
													<div key={index}>
														<Field
															name={`phNumbers[${index}]`}
														/>
														{index > 0 && (
															<button
																type="button"
																onClick={() =>
																	remove(
																		index
																	)
																}
															>
																-
															</button>
														)}
													</div>
												)
											)}
											<button
												type="button"
												onClick={() => push('')}
											>
												+
											</button>
										</div>
									);
								}}
							</FieldArray>
						</div>
						{/* <button
              type='button'
              onClick={() => formik.validateField('comments')}
            >
              Validate comments
            </button>
            <button
              type='button'
              onClick={() => formik.setFieldTouched('comments')}
            >
              Visit comments
            </button>
            <button type='button' onClick={() => formik.validateForm()}>
              Validate all
            </button>
            <button
              type='button'
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true
                })
              }
            >
              Visit all
            </button> */}
						<button
							type="button"
							onClick={() => setFormValues(savedValues)}
						>
							Load saved data
						</button>
						<button type="reset">Reset</button>
						<button
							type="submit"
							disabled={!formik.isValid || formik.isSubmitting}
						>
							Submit
						</button>
					</Form>
				);
			}}
		</Formik>
	);
}

export default YoutubeForm;
