import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { PerfilComponent } from './perfil.component';
import { UserService } from '../user.service';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilComponent],
      imports: [HttpClientTestingModule],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user profile on init', () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com' };
    spyOn(userService, 'getProfile').and.returnValue(of(mockUser));

    component.ngOnInit();

    expect(userService.getProfile).toHaveBeenCalled();
    expect(component.user).toEqual(mockUser);
  });

  it('should handle error on load user profile', () => {
    spyOn(userService, 'getProfile').and.returnValue(throwError('Error'));

    component.ngOnInit();

    expect(userService.getProfile).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Error al cargar el perfil');
  });

  it('should update user profile', () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com' };
    spyOn(userService, 'updateProfile').and.returnValue(of(mockUser));

    component.updateProfile();

    expect(userService.updateProfile).toHaveBeenCalledWith(component.user);
    // Here you can add more expectations based on what you expect to happen on successful profile update
  });

  it('should handle error on update user profile', () => {
    spyOn(userService, 'updateProfile').and.returnValue(throwError('Error'));

    component.updateProfile();

    expect(userService.updateProfile).toHaveBeenCalledWith(component.user);
    expect(component.errorMessage).toBe('Error al actualizar el perfil');
  });
});
